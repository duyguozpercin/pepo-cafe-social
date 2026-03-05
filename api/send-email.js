import { Resend } from "resend";
import formidable from "formidable";
import fs from "fs";

// Next.js'in varsayılan body parser'ını kapatıyoruz (Dosya okumak için şart)
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

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ ok: false, error: "Form işleme hatası" });
    }

    try {
      // Formidable verileri dizi olarak döndürebilir, ilk elemanları alıyoruz
      const getValue = (key) => (Array.isArray(fields[key]) ? fields[key][0] : fields[key]);
      
      const type = getValue("type");
      const name = getValue("adSoyad") || getValue("name");
      const email = getValue("email");
      const telefon = getValue("telefon");
      const mesaj = getValue("mesaj") || getValue("message");
      
      // Kariyer ve Franchise özel alanları
      const pozisyon = getValue("pozisyon");
      const deneyim = getValue("deneyim");
      const sehir = getValue("sehir");
      const butce = getValue("butce");

       const formType = String(type || "contact");
      const subject = formType === "franchise" ? "PEPO | Franchise Başvurusu" : 
                      formType === "career" ? "PEPO | İş Başvurusu" : "PEPO | İletişim Mesajı";
      

      let html = `<h3>${esc(subject)}</h3>
                  <p><b>Ad Soyad:</b> ${esc(name)}</p>
                  <p><b>Email:</b> ${esc(email)}</p>
                  <p><b>Telefon:</b> ${esc(telefon)}</p>`;

      if (formType === "franchise") {
        html += `<p><b>Şehir:</b> ${esc(sehir)}</p>
                 <p><b>Yatırım Bütçesi:</b> ${esc(butce)}</p>`;
      } else if (formType === "career") {
        html += `<p><b>Başvurulan Pozisyon:</b> ${esc(pozisyon)}</p>
                 <p><b>Deneyim:</b> ${esc(deneyim)}</p>`;
      }

      html += `<hr /><p><b>Mesaj:</b><br/>${nl2br(mesaj)}</p>`;

      // Dosya (CV) kontrolü
      const attachments = [];
      const uploadedFile = Array.isArray(files.cv) ? files.cv[0] : files.cv;

      if (uploadedFile) {
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
        subject,
        html,
        attachments,
      });

      return res.status(200).json({ ok: true, data });
    } catch (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }
  });
}