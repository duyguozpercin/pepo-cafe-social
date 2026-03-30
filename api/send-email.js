import { Resend } from "resend";
import formidable from "formidable";
import fs from "fs";

// Next.js body parser'ı devre dışı bırakıyoruz
export const config = {
  api: {
    bodyParser: false,
  },
};

const resend = new Resend(process.env.RESEND_API_KEY);

// HTML Güvenliği için XSS koruması
const esc = (v) =>
  String(v ?? "-")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const nl2br = (v) => esc(v).replace(/\n/g, "<br/>");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const form = formidable({ multiples: false });

  // Formidable'ı promise yapısında kullanarak hata yönetimini iyileştiriyoruz
  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Formidable verileri dizi olarak döner, güvenli şekilde alıyoruz
    const getValue = (key) => (Array.isArray(fields[key]) ? fields[key][0] : fields[key]);

    // TYPE KONTROLÜ (Kritik Düzeltme: Türkçe karakter toleransı)
    const rawType = getValue("type") || "contact";
    const formType = rawType.toLowerCase().trim();

    // Kariyer başvurusu için hem 'career' hem de 'kariyer/karıyer' ihtimallerini kontrol ediyoruz
    const isCareer = ["career", "kariyer", "karıyer"].includes(formType);
    const isFranchise = formType === "franchise";

    const subject = isFranchise
      ? "PEPO | Franchise Başvurusu"
      : isCareer
        ? "PEPO | İş Başvurusu"
        : "PEPO | İletişim Mesajı";

    // Ortak Alanlar
    const name = getValue("adSoyad") || getValue("name");
    const email = getValue("email");
    const telefon = getValue("telefon");
    const mesaj = getValue("mesaj") || getValue("message");

    let html = `<h3>${esc(subject)}</h3>
                <p><b>Ad Soyad:</b> ${esc(name)}</p>
                <p><b>Email:</b> ${esc(email)}</p>
                <p><b>Telefon:</b> ${esc(telefon)}</p>`;

    // Özel Alanlar
    if (isFranchise) {
      const sehir = getValue("sehir");
      const butce = getValue("butce");
      const konum = getValue("konum");
      html += `<p><b>Şehir:</b> ${esc(sehir)}</p>
               <p><b>Konum/Bölge:</b> ${esc(konum)}</p>
               <p><b>Yatırım Bütçesi:</b> ${esc(butce)}</p>`;
    } else if (isCareer) {
      const pozisyon = getValue("pozisyon");
      const deneyim = getValue("deneyim");
      html += `<p><b>Başvurulan Pozisyon:</b> ${esc(pozisyon)}</p>
               <p><b>Deneyim:</b> ${esc(deneyim)}</p>`;
    }

    html += `<hr /><p><b>Mesaj:</b><br/>${nl2br(mesaj)}</p>`;

    // Dosya (CV) kontrolü
    const attachments = [];
    const uploadedFile = files.cv ? (Array.isArray(files.cv) ? files.cv[0] : files.cv) : null;

    if (uploadedFile && uploadedFile.filepath) {
      const fileContent = fs.readFileSync(uploadedFile.filepath);
      attachments.push({
        filename: uploadedFile.originalFilename || "cv.pdf",
        content: fileContent,
      });
    }

    // E-posta gönderimi öncesi TEST
    console.log("TO:", process.env.RESEND_TO);
    console.log("FROM:", process.env.RESEND_FROM);
    console.log("API KEY VAR MI:", !!process.env.RESEND_API_KEY);

    // E-posta gönderimi
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO,
      replyTo: email ? [email] : undefined,
      subject: subject,
      html: html,
      attachments: attachments,
    });

    return res.status(200).json({ ok: true, data });

  } catch (error) {
    console.error("Mail Hatası:", error);
    return res.status(500).json({ ok: false, error: error.message });
  }
}