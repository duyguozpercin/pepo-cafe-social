import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const { name, email, message } = body;

    if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");
    if (!process.env.RESEND_FROM) throw new Error("Missing RESEND_FROM");
    if (!process.env.RESEND_TO) throw new Error("Missing RESEND_TO");

    if (!message || String(message).trim().length < 3) {
      return res.status(400).json({ error: "Message is required" });
    }

    const data = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO,
      replyTo: email ? [email] : undefined,
      subject: `PEPO Contact${name ? " - " + name : ""}`,
      html: `
        <h3>Yeni mesaj</h3>
        <p><b>Ad:</b> ${name || "-"}</p>
        <p><b>Email:</b> ${email || "-"}</p>
        <p><b>Mesaj:</b><br/>${String(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(200).json({ ok: true, data });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || "Server error" });
  }
}