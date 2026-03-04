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

// ---- helpers
const esc = (v) =>
  String(v ?? "-")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const nl2br = (v) => esc(v).replace(/\n/g, "<br/>");

const isValidEmail = (email) =>
  typeof email === "string" && /\S+@\S+\.\S+/.test(email);

const phoneDigits = (phone) => String(phone ?? "").replace(/\D/g, "");
const isValidPhone = (phone) => {
  const digits = phoneDigits(phone);
  // TR için 10-11; ama uluslararası gelebilir diye 10-15 arası tuttum
  return digits.length >= 10 && digits.length <= 15;
};

const pickFile = (fileOrArray) =>
  Array.isArray(fileOrArray) ? fileOrArray[0] : fileOrArray;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // env check (erken patlat)
  if (!process.env.RESEND_API_KEY)
    return res.status(500).json({ ok: false, error: "Missing RESEND_API_KEY" });
  if (!process.env.RESEND_FROM)
    return res.status(500).json({ ok: false, error: "Missing RESEND_FROM" });
  if (!process.env.RESEND_TO)
    return res.status(500).json({ ok: false, error: "Missing RESEND_TO" });

  const form = formidable({ multiples: false });

  form.parse(req, async (parseErr, fields, files) => {
    if (parseErr) {
      return res.status(500).json({ ok: false, error: "Form işleme hatası" });
    }

    try {
      // Formidable bazen alanları dizi döndürüyor
      const getValue = (key) => {
        const raw = fields?.[key];
        const v = Array.isArray(raw) ? raw[0] : raw;
        return typeof v === "string" ? v.trim() : v ?? "";
      };

      const formType = String(getValue("type") || "contact").toLowerCase();

      const name = getValue("adSoyad") || getValue("name");
      const email = getValue("email");
      const telefon = getValue("telefon");
      const mesaj = getValue("mesaj") || getValue("message");

      // Kariyer & Franchise alanları
      const pozisyon = getValue("pozisyon");
      const deneyim = getValue("deneyim");
      const sehir = getValue("sehir");
      const butce = getValue("butce");
      const konum = getValue("konum");
      const konu = getValue("konu");
      const cvDosyaText = getValue("cvDosya"); // link/metin gibi

      // ---- basic validation (backend)
      if (!name || String(name).length < 2) {
        return res.status(400).json({ ok: false, error: "Name is required" });
      }

      if (!email || !isValidEmail(email)) {
        return res
          .status(400)
          .json({ ok: false, error: "Valid email is required" });
      }

      // telefon bazı formlarda opsiyonel olabilir; doluysa kontrol et
      if (telefon && !isValidPhone(telefon)) {
        return res
          .status(400)
          .json({ ok: false, error: "Valid phone is required" });
      }

      if (!mesaj || String(mesaj).trim().length < 3) {
        return res
          .status(400)
          .json({ ok: false, error: "Message is required" });
      }

      const subject =
        formType === "franchise"
          ? "PEPO | Franchise Başvurusu"
          : formType === "career"
            ? "PEPO | Kariyer Başvurusu"
            : "PEPO | İletişim Mesajı";

      let html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h3>${esc(subject)}</h3>
          <p><b>Ad Soyad:</b> ${esc(name)}</p>
          <p><b>Email:</b> ${esc(email)}</p>
          <p><b>Telefon:</b> ${esc(telefon || "-")}</p>
      `;

      if (formType === "contact") {
        html += `
          <p><b>Konu:</b> ${esc(konu || "-")}</p>
        `;
      }

      if (formType === "franchise") {
        html += `
          <p><b>Şehir:</b> ${esc(sehir || "-")}</p>
          <p><b>Konum / Bölge:</b> ${esc(konum || "-")}</p>
          <p><b>Yatırım Bütçesi:</b> ${esc(butce || "-")}</p>
          <p><b>Deneyim:</b> ${esc(deneyim || "-")}</p>
        `;
      }

      if (formType === "career") {
        html += `
          <p><b>Başvurulan Pozisyon:</b> ${esc(pozisyon || "-")}</p>
          <p><b>Deneyim:</b> ${esc(deneyim || "-")}</p>
          <p><b>CV (Link/Not):</b> ${esc(cvDosyaText || "-")}</p>
        `;
      }

      html += `
          <hr />
          <p><b>Mesaj:</b><br/>${nl2br(mesaj)}</p>
        </div>
      `;

      // ---- attachment (CV file)
      const attachments = [];

      // bazı formlarda input name farklı olabiliyor, hepsini dene
      const uploadedFile =
        pickFile(files?.cv) ||
        pickFile(files?.cvDosya) ||
        pickFile(files?.file) ||
        null;

      if (uploadedFile) {
        // formidable v2/v3 alanları değişebiliyor, filepath / originalFilename tipik
        const filepath = uploadedFile.filepath || uploadedFile.path;
        const filename =
          uploadedFile.originalFilename ||
          uploadedFile.name ||
          "attachment.pdf";

        // max size (örn. 5MB)
        const size = uploadedFile.size || 0;
        const MAX = 5 * 1024 * 1024;
        if (size > MAX) {
          return res.status(400).json({
            ok: false,
            error: "Dosya çok büyük. Maksimum 5MB olmalı.",
          });
        }

        if (filepath) {
          const fileContent = await fs.promises.readFile(filepath);
          attachments.push({
            filename,
            content: fileContent,
          });
        }
      }

      const data = await resend.emails.send({
        from: process.env.RESEND_FROM,
        to: process.env.RESEND_TO,
        replyTo: email ? [email] : undefined,
        subject,
        html,
        attachments: attachments.length ? attachments : undefined,
      });

      return res.status(200).json({ ok: true, data });
    } catch (error) {
      return res
        .status(500)
        .json({ ok: false, error: error?.message || "Server error" });
    }
  });
}