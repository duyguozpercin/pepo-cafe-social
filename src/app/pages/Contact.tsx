import { useState } from "react";
import { ImageWithFallback } from "../components/ImageWithFallback";

const contactHeroImg =
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400";

interface ContactForm {
  adSoyad: string;
  telefon: string;
  email: string;
  konu: string;
  mesaj: string;
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 text-[0.72rem] tracking-[0.4em] text-[rgb(var(--pepo-gold))]">
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-[0.72rem] tracking-[0.2em] text-[rgb(var(--pepo-text))]/65">
      {children}
    </label>
  );
}

function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p className="mt-1 text-[0.72rem] text-[rgb(var(--pepo-gold))]">{children}</p>
  );
}

const baseField =
  "w-full bg-[rgb(var(--pepo-text))]/[0.04] border border-[rgb(var(--pepo-gold))]/25 px-5 py-[0.85rem] text-[0.95rem] text-[rgb(var(--pepo-text))] outline-none transition focus:border-[rgb(var(--pepo-gold))]/70";

function InfoCard({
  title,
  desc,
  meta,
}: {
  title: string;
  desc: string;
  meta?: string;
}) {
  return (
    <div className="border border-[rgb(var(--pepo-gold))]/20 p-10 transition hover:border-[rgb(var(--pepo-gold))]/40 hover:bg-[rgb(var(--pepo-gold))]/[0.04]">
      <h3 className="mb-3 text-[1.2rem] font-normal text-[rgb(var(--pepo-text))]">
        {title}
      </h3>
      <p className="text-[0.88rem] leading-7 text-[rgb(var(--pepo-text))]/55">
        {desc}
      </p>
      {meta ? (
        <div className="mt-5 text-[0.72rem] tracking-[0.15em] text-[rgb(var(--pepo-text))]/40">
          {meta}
        </div>
      ) : null}
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState<ContactForm>({
    adSoyad: "",
    telefon: "",
    email: "",
    konu: "",
    mesaj: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const validate = () => {
    const errs: Partial<ContactForm> = {};
    if (!form.adSoyad.trim()) errs.adSoyad = "Ad Soyad zorunludur.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Geçerli bir e-posta girin.";
    if (!form.mesaj.trim()) errs.mesaj = "Mesaj zorunludur.";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--pepo-bg))]">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-40">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={contactHeroImg}
            alt="İletişim"
            className="h-full w-full object-cover brightness-[0.18]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--pepo-bg))]/20 to-[rgb(var(--pepo-bg))]/95" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <SectionKicker>BİZE ULAŞIN</SectionKicker>

          <h1 className="mb-6 font-normal leading-[1.1] text-[rgb(var(--pepo-text))] text-[clamp(2.5rem,6vw,5rem)]">
            İletişim
          </h1>

          <p className="mx-auto max-w-[620px] text-[1rem] leading-[1.9] text-[rgb(var(--pepo-text))]/60">
            Soruların, önerilerin veya rezervasyon taleplerin için yaz.
            En kısa sürede dönüş yaparız.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="tel:+905000000000"
              className="inline-flex items-center border border-[rgb(var(--pepo-gold))]/50 px-8 py-3 text-[0.75rem] tracking-[0.2em] text-[rgb(var(--pepo-gold))] transition hover:bg-[rgb(var(--pepo-gold))] hover:text-[rgb(var(--pepo-bg))]"
            >
              HEMEN ARA
            </a>
            <a
              href="mailto:hello@pepo.com"
              className="inline-flex items-center border border-[rgb(var(--pepo-text))]/20 px-8 py-3 text-[0.75rem] tracking-[0.2em] text-[rgb(var(--pepo-text))]/70 transition hover:border-[rgb(var(--pepo-text))]/35 hover:text-[rgb(var(--pepo-text))]"
            >
              E-POSTA GÖNDER
            </a>
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="bg-[rgb(var(--pepo-bg-2))] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <SectionKicker>KONUM & BİLGİ</SectionKicker>
            <h2 className="font-normal text-[rgb(var(--pepo-text))] text-[clamp(1.8rem,3.5vw,2.8rem)]">
              Kapımız Açık
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <InfoCard
              title="Adres"
              desc="Bağdat Caddesi, No: 00, Kadıköy / İstanbul"
              meta="HARİTADA AÇ"
            />
            <InfoCard
              title="Telefon"
              desc="+90 500 000 00 00"
              meta="WHATSAPP / ARAMA"
            />
            <InfoCard
              title="Çalışma Saatleri"
              desc="Hafta içi 08:00–22:00 • Hafta sonu 09:00–23:00"
              meta="RESMİ TATİLLERDE DEĞİŞEBİLİR"
            />
          </div>

          {/* Map / Image strip */}
          <div className="relative mt-10 h-[280px] overflow-hidden">
            <ImageWithFallback
              src={contactHeroImg}
              alt="Pepo Konum"
              className="h-full w-full object-cover brightness-[0.45]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[rgb(var(--pepo-bg))]/85 via-[rgb(var(--pepo-bg))]/30 to-[rgb(var(--pepo-bg))]/85">
              <div className="text-center">
                <div className="mb-3 text-[0.65rem] tracking-[0.4em] text-[rgb(var(--pepo-gold))]">
                  ——— &nbsp; ———
                </div>
                <h3 className="text-[clamp(1.6rem,4vw,3rem)] font-normal tracking-[0.05em] text-[rgb(var(--pepo-text))]">
                  Haritayı buraya ekleyebilirsin
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-[0.88rem] leading-7 text-[rgb(var(--pepo-text))]/55">
                  Google Maps embed kullanacaksan bu alanın içine iframe koymak yeterli.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-[0.72rem] tracking-[0.1em] text-[rgb(var(--pepo-text))]/30">
            * Konum bilgisini sonradan güncellersin, tasarım aynı kalır.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-[rgb(var(--pepo-bg))] px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <SectionKicker>MESAJ GÖNDER</SectionKicker>
            <h2 className="font-normal text-[rgb(var(--pepo-text))] text-[clamp(1.8rem,3.5vw,2.8rem)]">
              İletişim Formu
            </h2>
            <p className="mt-3 text-[0.9rem] leading-8 text-[rgb(var(--pepo-text))]/50">
              Formu doldur, ekibimiz dönüş yapsın.
            </p>
          </div>

          {submitted ? (
            <div className="border border-[rgb(var(--pepo-gold))]/35 px-8 py-16 text-center">
              <div className="mb-4 text-3xl text-[rgb(var(--pepo-gold))]">✓</div>
              <h3 className="mb-4 text-[1.5rem] font-normal text-[rgb(var(--pepo-text))]">
                Mesajın Alındı
              </h3>
              <p className="text-[0.9rem] leading-8 text-[rgb(var(--pepo-text))]/55">
                Teşekkürler. En kısa sürede dönüş yapacağız.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <FieldLabel>AD SOYAD *</FieldLabel>
                  <input
                    type="text"
                    value={form.adSoyad}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, adSoyad: e.target.value }))
                    }
                    placeholder="Adınız Soyadınız"
                    className={baseField}
                  />
                  <FieldError>{errors.adSoyad}</FieldError>
                </div>

                <div>
                  <FieldLabel>TELEFON</FieldLabel>
                  <input
                    type="tel"
                    value={form.telefon}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, telefon: e.target.value }))
                    }
                    placeholder="+90 5__ ___ __ __"
                    className={baseField}
                  />
                </div>
              </div>

              <div>
                <FieldLabel>E-POSTA *</FieldLabel>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="ornek@email.com"
                  className={baseField}
                />
                <FieldError>{errors.email}</FieldError>
              </div>

              <div>
                <FieldLabel>KONU</FieldLabel>
                <input
                  type="text"
                  value={form.konu}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, konu: e.target.value }))
                  }
                  placeholder="Örn: Rezervasyon / Öneri / İş birliği"
                  className={baseField}
                />
              </div>

              <div>
                <FieldLabel>MESAJ *</FieldLabel>
                <textarea
                  value={form.mesaj}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, mesaj: e.target.value }))
                  }
                  placeholder="Mesajını yaz..."
                  rows={6}
                  className={baseField + " resize-y"}
                />
                <FieldError>{errors.mesaj}</FieldError>
              </div>

              <div className="text-[0.72rem] leading-7 text-[rgb(var(--pepo-text))]/35">
                * Bilgilerin yalnızca iletişim amacıyla kullanılacaktır.
              </div>

              <button
                type="submit"
                className="self-start bg-[rgb(var(--pepo-gold))] px-12 py-4 text-[0.8rem] tracking-[0.25em] text-[rgb(var(--pepo-bg))] transition hover:bg-[rgb(var(--pepo-gold-2))]"
              >
                GÖNDER
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
