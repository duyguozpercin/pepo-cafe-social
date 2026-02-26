import React, { useState } from "react";
import { ImageWithFallback } from "../components/ImageWithFallback";

const franchiseImg = "pepo-franchise.png";

const benefits = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Güçlü Marka",
    desc: "Tanınan ve güvenilen PEPO markasının arkasında durun.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Kapsamlı Eğitim",
    desc: "Operasyon, servis ve kahve eğitimlerinde tam destek.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Süregelen Destek",
    desc: "Açılıştan sonra da yanınızda olan deneyimli ekip.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Kanıtlanmış Model",
    desc: "Başarılı iş modeli ve güçlü kâr marjı ile sürdürülebilir büyüme.",
  },
];

const steps = [
  { num: "01", title: "Başvuru", desc: "Formu doldurun, size ulaşalım." },
  {
    num: "02",
    title: "Ön Görüşme",
    desc: "Telefon ya da yüz yüze tanışma toplantısı.",
  },
  { num: "03", title: "Değerlendirme", desc: "Konum ve fizibilite analizi." },
  { num: "04", title: "Anlaşma", desc: "Franchise sözleşmesinin imzalanması." },
  { num: "05", title: "Eğitim", desc: "Kapsamlı operasyon ve kahve eğitimi." },
  { num: "06", title: "Açılış", desc: "PEPO ailesine hoş geldiniz!" },
];

interface FormData {
  adSoyad: string;
  telefon: string;
  email: string;
  sehir: string;
  konum: string;
  butce: string;
  deneyim: string;
  mesaj: string;
}

export function Franchise() {
  const [form, setForm] = useState<FormData>({
    adSoyad: "",
    telefon: "",
    email: "",
    sehir: "",
    konum: "",
    butce: "",
    deneyim: "",
    mesaj: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSending, setIsSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.adSoyad.trim()) newErrors.adSoyad = "Ad Soyad zorunludur.";
    if (!form.telefon.trim()) newErrors.telefon = "Telefon zorunludur.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Geçerli bir e-posta girin.";
    if (!form.sehir.trim()) newErrors.sehir = "Şehir zorunludur.";
    if (!form.butce) newErrors.butce = "Bütçe aralığı seçiniz.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSending(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "franchise",
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok || data?.ok === false || data?.data?.error) {
        const msg =
          data?.error ||
          data?.data?.error?.message ||
          "Gönderim sırasında hata oluştu. Lütfen tekrar deneyin.";
        throw new Error(msg);
      }

      setSubmitted(true);

      setForm({
        adSoyad: "",
        telefon: "",
        email: "",
        sehir: "",
        konum: "",
        butce: "",
        deneyim: "",
        mesaj: "",
      });
    } catch (err: any) {
      setServerError(err?.message || "Gönderim sırasında hata oluştu.");
    } finally {
      setIsSending(false);
    }
  };

  const labelClass =
    "block mb-2 text-[0.72rem] tracking-[0.2em] text-[rgba(245,240,232,0.65)]";

  const inputClass =
    "w-full bg-[rgba(245,240,232,0.04)] border border-[rgb(var(--pepo-gold))]/25 text-[rgb(var(--pepo-text))] px-[1.2rem] py-[0.85rem] text-[0.95rem] outline-none transition-colors duration-200 focus:border-[rgb(var(--pepo-gold))]/70";

  const errorClass = "mt-1.5 text-[0.72rem] text-[rgb(var(--pepo-gold))]";

  const selectClass =
    inputClass +
    " appearance-none cursor-pointer pr-12 bg-no-repeat bg-[right_1rem_center]";

  const selectArrowBg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%23C49A2A' stroke-width='1.5' fill='none'/></svg>")`;

  return (
    <div className="min-h-screen bg-[rgb(var(--pepo-bg))]">
      {/* Hero */}
      <section className="relative pt-40 pb-28 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={franchiseImg}
            alt="Franchise"
            className="w-full h-full object-cover brightness-[0.2]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,15,8,0.3)_0%,rgba(26,15,8,0.9)_100%)]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-[rgb(var(--pepo-gold))] text-[0.72rem] tracking-[0.4em] mb-5">
            BİZİMLE BÜYÜYÜN
          </div>

          <h1 className="text-[rgb(var(--pepo-text))] font-normal leading-[1.1] mb-6 text-[clamp(2.5rem,6vw,5rem)]">
            PEPO Franchise
          </h1>

          <p className="text-[rgba(245,240,232,0.6)] text-[1rem] leading-[1.9] max-w-[600px] mx-auto">
            PEPO Coffee & Social olarak franchise yolculuğumuza ilk adımı atıyoruz.
            Sizi de bu büyümekte olan ailenin bir parçası yapmak istiyoruz.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[rgb(var(--pepo-bg-2))] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[rgb(var(--pepo-gold))] text-[0.72rem] tracking-[0.4em] mb-4">
              NEDEN PEPO?
            </div>
            <h2 className="text-[rgb(var(--pepo-text))] font-normal text-[clamp(1.8rem,3.5vw,2.8rem)]">
              Franchise Avantajlarımız
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="border border-[rgb(var(--pepo-gold))]/15 px-8 py-10 transition-colors duration-200 hover:border-[rgb(var(--pepo-gold))]/45 hover:bg-[rgba(196,154,42,0.03)]"
              >
                <div className="text-[rgb(var(--pepo-gold))] mb-5">{b.icon}</div>
                <h3 className="text-[rgb(var(--pepo-text))] text-[1.2rem] font-normal mb-3">
                  {b.title}
                </h3>
                <p className="text-[rgba(245,240,232,0.5)] text-[0.88rem] leading-[1.75]">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-[rgb(var(--pepo-bg))] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[rgb(var(--pepo-gold))] text-[0.72rem] tracking-[0.4em] mb-4">
              SÜREÇ
            </div>
            <h2 className="text-[rgb(var(--pepo-text))] font-normal text-[clamp(1.8rem,3.5vw,2.8rem)]">
              Nasıl Çalışır?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="text-[rgb(var(--pepo-gold))] text-[2rem] leading-none mb-3 opacity-70">
                  {step.num}
                </div>

                <div className="w-px h-[30px] bg-[rgba(196,154,42,0.3)] mx-auto mb-3" />

                <h4 className="text-[rgb(var(--pepo-text))] text-[1rem] font-normal mb-1.5">
                  {step.title}
                </h4>
                <p className="text-[rgba(245,240,232,0.45)] text-[0.78rem] leading-[1.6]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-[rgb(var(--pepo-bg-2))] py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[rgb(var(--pepo-gold))] text-[0.72rem] tracking-[0.4em] mb-4">
              BAŞVURU FORMU
            </div>

            <h2 className="text-[rgb(var(--pepo-text))] font-normal text-[clamp(1.8rem,3.5vw,2.8rem)]">
              Franchise Başvurusu
            </h2>

            <p className="text-[rgba(245,240,232,0.5)] text-[0.9rem] mt-3 leading-[1.8]">
              Formu doldurun, ekibimiz en kısa sürede sizinle iletişime geçsin.
            </p>
          </div>

          {submitted ? (
            <div className="border border-[rgb(var(--pepo-gold))]/35 px-8 py-16 text-center">
              <div className="text-[rgb(var(--pepo-gold))] text-[2rem] mb-4">✓</div>
              <h3 className="text-[rgb(var(--pepo-text))] text-[1.5rem] font-normal mb-4">
                Başvurunuz Alındı
              </h3>
              <p className="text-[rgba(245,240,232,0.55)] text-[0.9rem] leading-[1.8]">
                Teşekkür ederiz! Franchise başvurunuzu aldık. Ekibimiz en geç 3 iş günü içinde
                sizinle iletişime geçecektir.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {serverError && (
                <div className="border border-[rgb(var(--pepo-gold))]/35 bg-[rgba(196,154,42,0.06)] px-5 py-4 text-[rgba(245,240,232,0.8)] text-[0.9rem]">
                  {serverError}
                </div>
              )}

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>AD SOYAD *</label>
                  <input
                    type="text"
                    value={form.adSoyad}
                    onChange={(e) => setForm({ ...form, adSoyad: e.target.value })}
                    placeholder="Adınız Soyadınız"
                    className={inputClass}
                  />
                  {errors.adSoyad && <p className={errorClass}>{errors.adSoyad}</p>}
                </div>

                <div>
                  <label className={labelClass}>TELEFON *</label>
                  <input
                    type="tel"
                    value={form.telefon}
                    onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                    placeholder="+90 5__ ___ __ __"
                    className={inputClass}
                  />
                  {errors.telefon && <p className={errorClass}>{errors.telefon}</p>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>E-POSTA *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ornek@email.com"
                    className={inputClass}
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>

                <div>
                  <label className={labelClass}>ŞEHİR *</label>
                  <input
                    type="text"
                    value={form.sehir}
                    onChange={(e) => setForm({ ...form, sehir: e.target.value })}
                    placeholder="Yaşadığınız şehir"
                    className={inputClass}
                  />
                  {errors.sehir && <p className={errorClass}>{errors.sehir}</p>}
                </div>
              </div>

              {/* Konum */}
              <div>
                <label className={labelClass}>AÇMAK İSTEDİĞİNİZ KONUM / BÖLGE</label>
                <input
                  type="text"
                  value={form.konum}
                  onChange={(e) => setForm({ ...form, konum: e.target.value })}
                  placeholder="Düşündüğünüz semt veya bölge (varsa)"
                  className={inputClass}
                />
              </div>

              {/* Budget + Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>YATIRIM BÜTÇESİ *</label>
                  <div className="relative">
                    <select
                      value={form.butce}
                      onChange={(e) => setForm({ ...form, butce: e.target.value })}
                      className={selectClass}
                      style={{ backgroundImage: selectArrowBg }}
                    >
                      <option value="" className="bg-[rgb(var(--pepo-bg))]">
                        Seçiniz
                      </option>
                      <option value="500k-750k" className="bg-[rgb(var(--pepo-bg))]">
                        500.000₺ – 750.000₺
                      </option>
                      <option value="750k-1m" className="bg-[rgb(var(--pepo-bg))]">
                        750.000₺ – 1.000.000₺
                      </option>
                      <option value="1m-2m" className="bg-[rgb(var(--pepo-bg))]">
                        1.000.000₺ – 2.000.000₺
                      </option>
                      <option value="2m+" className="bg-[rgb(var(--pepo-bg))]">
                        2.000.000₺ üzeri
                      </option>
                    </select>
                  </div>
                  {errors.butce && <p className={errorClass}>{errors.butce}</p>}
                </div>

                <div>
                  <label className={labelClass}>İŞ DENEYİMİ</label>
                  <select
                    value={form.deneyim}
                    onChange={(e) => setForm({ ...form, deneyim: e.target.value })}
                    className={selectClass}
                    style={{ backgroundImage: selectArrowBg }}
                  >
                    <option value="" className="bg-[rgb(var(--pepo-bg))]">
                      Seçiniz
                    </option>
                    <option value="yok" className="bg-[rgb(var(--pepo-bg))]">
                      İş deneyimim yok
                    </option>
                    <option value="diger" className="bg-[rgb(var(--pepo-bg))]">
                      Farklı sektörde deneyim
                    </option>
                    <option value="fnd" className="bg-[rgb(var(--pepo-bg))]">
                      F&B / Yeme-içme sektöründe deneyim
                    </option>
                    <option value="franchise" className="bg-[rgb(var(--pepo-bg))]">
                      Daha önce franchise işletmiş
                    </option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className={labelClass}>EK MESAJ / NOTLAR</label>
                <textarea
                  value={form.mesaj}
                  onChange={(e) => setForm({ ...form, mesaj: e.target.value })}
                  placeholder="Kendinizi ve franchise planınız hakkında kısaca bilgi verin..."
                  rows={5}
                  className={inputClass + " resize-y"}
                />
              </div>

              <div className="text-[rgba(245,240,232,0.35)] text-[0.72rem] leading-[1.7]">
                * Kişisel verileriniz yalnızca franchise değerlendirme sürecinde kullanılacak ve
                üçüncü taraflarla paylaşılmayacaktır.
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="bg-[rgb(var(--pepo-gold))] text-[rgb(var(--pepo-bg))] px-12 py-[1.1rem] tracking-[0.25em] text-[0.8rem] cursor-pointer transition-colors duration-200 hover:bg-[rgb(var(--pepo-gold-2))] self-start disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? "GÖNDERİLİYOR..." : "BAŞVURUYU GÖNDER"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}