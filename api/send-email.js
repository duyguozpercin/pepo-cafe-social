import { Resend } from "resend";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const resend = new Resend(process.env.RESEND_API_KEY);

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

  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const getValue = (key) =>
      Array.isArray(fields[key]) ? fields[key][0] : fields[key];

    const rawType = getValue("type") || "contact";
    const formType = rawType.toLowerCase().trim();

    const isCareer = ["career", "kariyer", "karıyer"].includes(formType);
    const isFranchise = formType === "franchise";

    const subject = isFranchise
      ? "PEPO | Franchise Başvurusu"
      : isCareer
      ? "PEPO | İş Başvurusu"
      : "PEPO | İletişim Mesajı";

    const name = getValue("adSoyad") || getValue("name");
    const email = getValue("email");
    const telefon = getValue("telefon");
    const mesaj = getValue("mesaj") || getValue("message");

    // 🔥 YENİ TASARIM BAŞLANGIÇ
    let html = `
    <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:40px 0;">
      <div style="max-width:600px; margin:0 auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08);">
        
        <!-- HEADER -->
        <div style="background:#1A0F08; padding:20px; text-align:center;">
          <h1 style="color:#C49A2A; margin:0; font-size:24px;">PEPO Coffee</h1>
        </div>

        <!-- BODY -->
        <div style="padding:30px;">
          <h2 style="margin-top:0;">${esc(subject)}</h2>

          <p><strong>Ad Soyad:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Telefon:</strong> ${esc(telefon)}</p>
    `;

    if (isFranchise) {
      const sehir = getValue("sehir");
      const butce = getValue("butce");
      const konum = getValue("konum");

      html += `
        <p><strong>Şehir:</strong> ${esc(sehir)}</p>
        <p><strong>Konum/Bölge:</strong> ${esc(konum)}</p>
        <p><strong>Yatırım Bütçesi:</strong> ${esc(butce)}</p>
      `;
    } else if (isCareer) {
      const pozisyon = getValue("pozisyon");
      const deneyim = getValue("deneyim");

      html += `
        <p><strong>Başvurulan Pozisyon:</strong> ${esc(pozisyon)}</p>
        <p><strong>Deneyim:</strong> ${esc(deneyim)}</p>
      `;
    }

    // MESAJ BLOĞU
    html += `
      <div style="margin-top:20px;">
        <p><strong>Mesaj:</strong></p>
        <div style="background:#f3f3f3; padding:15px; border-radius:8px;">
          ${nl2br(mesaj)}
        </div>
      </div>
    `;

    // 🔥 FOOTER (SENİN SORDUĞUN KISIM TAM BURADA)
    html += `
        </div>

        <div style="padding:20px; text-align:center; font-size:12px; color:#999;">
          Bu mail otomatik olarak gönderildi.
        </div>

      </div>
    </div>
    `;

    // DOSYA (CV)
    const attachments = [];
    const uploadedFile = files.cv
      ? Array.isArray(files.cv)
        ? files.cv[0]
        : files.cv
      : null;

    if (uploadedFile && uploadedFile.filepath) {
      const fileContent = fs.readFileSync(uploadedFile.filepath);
      attachments.push({
        filename: uploadedFile.originalFilename || "cv.pdf",
        content: fileContent,
      });
    }

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