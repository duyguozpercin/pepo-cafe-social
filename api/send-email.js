import { Resend } from "resend";

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

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});

    const {
      type, // "franchise" | "career" | "contact"
      name,
      email,
      message,

      // franchise fields (frontend'den ...form ile gelecek)
      adSoyad,
      telefon,
      sehir,
      konum,
      butce,
      deneyim,
      mesaj,

      // career/contact gibi formlar için ekstra alanlar gelirse otomatik listeleriz
      ...rest
    } = body;

    if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
    if (!process.env.RESEND_FROM) throw new Error("Missing RESEND_FROM");
    if (!process.env.RESEND_TO) throw new Error("Missing RESEND_TO");

    const formType = String(type || "contact");

    const subject =
      formType === "franchise"
        ? "PEPO | Franchise Başvurusu"
        : formType === "career"
          ? "PEPO | Kariyer Başvurusu"
          : "PEPO | İletişim Mesajı";

    // Message normalize
    const normalizedMessage =
      formType === "franchise"
        ? (mesaj ?? message ?? "")
        : (message ?? mesaj ?? "");

    if (!normalizedMessage || String(normalizedMessage).trim().length < 3) {
      return res.status(400).json({ ok: false, error: "Message is required" });
    }

    let html = "";

    if (formType === "franchise") {
      html = `
        <h3>Franchise Başvurusu</h3>
        <p><b>Ad Soyad:</b> ${esc(adSoyad)}</p>
        <p><b>Telefon:</b> ${esc(telefon)}</p>
        <p><b>Email:</b> ${esc(email)}</p>
        <p><b>Şehir:</b> ${esc(sehir)}</p>
        <p><b>Konum/Bölge:</b> ${esc(konum)}</p>
        <p><b>Yatırım Bütçesi:</b> ${esc(butce)}</p>
        <p><b>İş Deneyimi:</b> ${esc(deneyim)}</p>
        <hr />
        <p><b>Ek Mesaj / Notlar:</b><br/>${nl2br(normalizedMessage)}</p>
      `;
    } else {
      // contact / career generic template
      // Eğer ekstra alanlar geldiyse mailde listeleyelim
      const extra =
        Object.keys(rest || {}).length > 0
          ? `
            <hr />
            <h4>Ek Alanlar</h4>
            <ul>
              ${Object.entries(rest)
                .map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`)
                .join("")}
            </ul>
          `
          : "";

      html = `
        <h3>${esc(subject)}</h3>
        <p><b>Ad:</b> ${esc(name || adSoyad)}</p>
        <p><b>Email:</b> ${esc(email)}</p>
        <hr />
        <p><b>Mesaj:</b><br/>${nl2br(normalizedMessage)}</p>
        ${extra}
      `;
    }

    const data = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO,
      replyTo: email ? [email] : undefined,
      subject,
      html,
    });

    return res.status(200).json({ ok: true, data });
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, error: err?.message || "Server error" });
  }
}