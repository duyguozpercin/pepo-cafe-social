import { useState } from "react";

const baseField = "w-full bg-[rgb(var(--pepo-text))]/[0.04] border border-[rgb(var(--pepo-gold))]/25 px-5 py-[0.85rem] text-[0.95rem] text-[rgb(var(--pepo-text))] outline-none transition focus:border-[rgb(var(--pepo-gold))]/70";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-[0.72rem] tracking-[0.2em] text-[rgb(var(--pepo-text))]/65 uppercase">{children}</label>;
}

function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1 text-[0.72rem] text-[rgb(var(--pepo-gold))]">{children}</p>;
}

interface DynamicFormProps {
  type: "İLETİŞİM" | "FRANCHISE" | "KARİYER";
  title: string;
  description: string;
  children?: React.ReactNode;
  onSubmit: (formData: any) => Promise<void>;
}

export function DynamicForm({ type, title, description, children, onSubmit }: DynamicFormProps) {
  const [form, setForm] = useState({ adSoyad: "", email: "", telefon: "", mesaj: "" });
  const [errors, setErrors] = useState<any>({});
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: any = {};
    const nameRegex = /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]*$/;
    const phoneRegex = /^[0-9+\s]*$/;

    if (!form.adSoyad.trim()) errs.adSoyad = "Ad Soyad zorunludur.";
    else if (!nameRegex.test(form.adSoyad)) errs.adSoyad = "Ad Soyad sadece harf içermelidir.";

    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Geçerli bir e-posta girin.";

    if (form.telefon.trim() && !phoneRegex.test(form.telefon)) errs.telefon = "Geçerli bir telefon numarası girin.";

    if (!form.mesaj.trim()) errs.mesaj = "Mesaj zorunludur.";

    return errs;
  };

  // DynamicForm.tsx içindeki handleSubmit fonksiyonu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSending(true);
    try {
      const formData = new FormData();
      formData.append("type", type.toLowerCase());
      formData.append("adSoyad", form.adSoyad);
      formData.append("email", form.email);
      formData.append("telefon", form.telefon);
      formData.append("mesaj", form.mesaj);

      // Dışarıdaki (Sayfaya özel) alanları otomatik topla
      const customInputs = e.currentTarget.querySelectorAll('input[name], select[name], textarea[name]');
      customInputs.forEach((input: any) => {
        if (input.type === 'file') {
          if (input.files[0]) formData.append("cv", input.files[0]);
        } else {
          formData.append(input.name, input.value);
        }
      });

      await onSubmit(formData); // Güncellenmiş FormData'yı gönder
      setSubmitted(true);
    } catch (error) {
      alert("Gönderim hatası oluştu.");
    } finally {
      setIsSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-[rgb(var(--pepo-gold))]/35 px-8 py-16 text-center">
        <div className="mb-4 text-3xl text-[rgb(var(--pepo-gold))]">✓</div>
        <h3 className="mb-4 text-[1.5rem] font-normal text-[rgb(var(--pepo-text))]">Mesajın Alındı</h3>
        <p className="text-[0.9rem] leading-8 text-[rgb(var(--pepo-text))]/55">En kısa sürede dönüş yapacağız.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-14 text-center">
        <div className="mb-4 text-[0.72rem] tracking-[0.4em] text-[rgb(var(--pepo-gold))]">{type}</div>
        <h2 className="font-normal text-[rgb(var(--pepo-text))] text-[clamp(1.8rem,3.5vw,2.8rem)]">{title}</h2>
        <p className="mt-3 text-[0.9rem] leading-8 text-[rgb(var(--pepo-text))]/50">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>
            <FieldLabel>AD SOYAD *</FieldLabel>
            <input
              className={baseField}
              value={form.adSoyad}
              onChange={(e) => setForm({ ...form, adSoyad: e.target.value })}
              placeholder="Adınız Soyadınız"
            />
            <FieldError>{errors.adSoyad}</FieldError>
          </div>


          <div>
            <FieldLabel>TELEFON</FieldLabel>
            <input
              className={baseField}
              value={form.telefon}
              onChange={(e) => {
                const val = e.target.value;
                const filteredVal = val.replace(/[^0-9+\s]/g, "");
                setForm({ ...form, telefon: filteredVal });
              }}
              placeholder="+90 5__ ___ __ __"
            />
            <FieldError>{errors.telefon}</FieldError>
          </div>
        </div>

        <div>
          <FieldLabel>E-POSTA *</FieldLabel>
          <input
            className={baseField}
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <FieldError>{errors.email}</FieldError>
        </div>

        {children}

        <div>
          <FieldLabel>MESAJ *</FieldLabel>
          <textarea
            className={baseField + " resize-y"}
            rows={5}
            value={form.mesaj}
            onChange={(e) => setForm({ ...form, mesaj: e.target.value })}
          />
          <FieldError>{errors.mesaj}</FieldError>
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="self-start bg-[rgb(var(--pepo-gold))] px-12 py-4 text-[0.8rem] tracking-[0.25em] text-[rgb(var(--pepo-bg))] transition hover:opacity-80"
        >
          {isSending ? "GÖNDERİLİYOR..." : "GÖNDER"}
        </button>
      </form>
    </div>
  );
}