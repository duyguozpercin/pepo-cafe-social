import { useState } from "react";
import { ImageWithFallback } from "../components/ImageWithFallback";

const baristaImg =
  "https://images.unsplash.com/photo-1770991966683-472a770d0ebf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900";

const positions = [
  {
    id: "barista",
    title: "Barista",
    type: "Tam Zamanlı",
    location: "İstanbul",
    desc: "Espresso bazlı içeceklerin hazırlanması, müşteri memnuniyeti ve kafe operasyonlarında aktif rol.",
    requirements: [
      "En az 1 yıl barista deneyimi",
      "Kahve teknikleri ve ekipmanları hakkında bilgi",
      "Müşteri odaklı, güleryüzlü iletişim",
      "Takım çalışmasına yatkın",
    ],
  },
  {
    id: "kasiyer",
    title: "Kasiyer / Kafe Görevlisi",
    type: "Tam Zamanlı / Yarı Zamanlı",
    location: "İstanbul",
    desc: "Sipariş alma, ödeme işlemleri, kafe temizliği ve stok takibinde destek.",
    requirements: [
      "Müşteri hizmetlerinde deneyim tercih edilir",
      "Hızlı ve dikkatli çalışma yetisi",
      "Güleryüzlü ve enerjik kişilik",
      "Esnek çalışma saatlerine uyum",
    ],
  },
  {
    id: "pastaci",
    title: "Pastacı / Pasta Şefi",
    type: "Tam Zamanlı",
    location: "İstanbul",
    desc: "Günlük taze pastalar, kruvasanlar ve tatlıların üretimi. Menü geliştirme süreçlerine katkı.",
    requirements: [
      "Pastacılık veya mutfak sanatları eğitimi",
      "En az 2 yıl deneyim",
      "Kruvasan ve Fransız hamurlarında bilgi sahibi olmak",
      "Hijyen kurallarına titizlik",
    ],
  },
  {
    id: "mudur",
    title: "Kafe Müdürü",
    type: "Tam Zamanlı",
    location: "İstanbul",
    desc: "Kafe operasyonlarının yönetimi, ekip koordinasyonu, stok ve maliyet takibi.",
    requirements: [
      "F&B sektöründe en az 3 yıl yönetici deneyimi",
      "Güçlü liderlik ve organizasyon becerileri",
      "Stok ve maliyet yönetimi tecrübesi",
      "İşyeri saatleri konusunda esneklik",
    ],
  },
];

interface CareerForm {
  adSoyad: string;
  telefon: string;
  email: string;
  pozisyon: string;
  deneyim: string;
  mesaj: string;
  cvDosya: string;
}

const selectChevronBg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%23C49A2A' stroke-width='1.5' fill='none'/></svg>")`;

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
    <p className="mt-1 text-[0.72rem] text-[rgb(var(--pepo-gold))]">
      {children}
    </p>
  );
}

const baseField =
  "w-full bg-[rgb(var(--pepo-text))]/[0.04] border border-[rgb(var(--pepo-gold))]/25 px-5 py-[0.85rem] text-[0.95rem] text-[rgb(var(--pepo-text))] outline-none transition focus:border-[rgb(var(--pepo-gold))]/70";

const baseSelect =
  baseField +
  " appearance-none cursor-pointer bg-no-repeat bg-[right_1rem_center] pr-12";

export function Career() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const [form, setForm] = useState<CareerForm>({
    adSoyad: "",
    telefon: "",
    email: "",
    pozisyon: "",
    deneyim: "",
    mesaj: "",
    cvDosya: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<CareerForm>>({});
  const [isSending, setIsSending] = useState(false);
  const [serverError, setServerError] = useState<string>("");

  const openForm = (positionId: string) => {
    const pos = positions.find((p) => p.id === positionId);
    setForm((f) => ({ ...f, pozisyon: pos?.title || "" }));
    setSelectedPosition(positionId);

    setTimeout(() => {
      document
        .getElementById("basvuru-formu")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const validate = () => {
    const errs: Partial<CareerForm> = {};
    if (!form.adSoyad.trim()) errs.adSoyad = "Ad Soyad zorunludur.";
    if (!form.telefon.trim()) errs.telefon = "Telefon zorunludur.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Geçerli bir e-posta girin.";
    if (!form.pozisyon) errs.pozisyon = "Pozisyon seçiniz.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSending(true);

    try {
      const payload = {
        type: "career",
        name: form.adSoyad,
        email: form.email,
        message: `Pozisyon: ${form.pozisyon || "-"}\nTelefon: ${
          form.telefon || "-"
        }\nDeneyim: ${form.deneyim || "-"}\nCV: ${form.cvDosya || "-"}\n\n${
          form.mesaj || "-"
        }`,
        // ekstra alanlar (backend loglamak isterse)
        telefon: form.telefon,
        pozisyon: form.pozisyon,
        deneyim: form.deneyim,
        cvDosya: form.cvDosya,
      };

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const msg =
          data?.error ||
          data?.message ||
          "Gönderim sırasında bir hata oluştu. Tekrar dene.";
        setServerError(msg);
        return;
      }

      setSubmitted(true);
    } catch (err: any) {
      setServerError(err?.message || "Ağ hatası oluştu. Tekrar dene.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--pepo-bg))]">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-40">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={baristaImg}
            alt="Kariyer"
            className="h-full w-full object-cover brightness-[0.18]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--pepo-bg))]/20 to-[rgb(var(--pepo-bg))]/95" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <SectionKicker>EKİBİMİZE KATILIN</SectionKicker>

          <h1 className="mb-6 font-normal leading-[1.1] text-[rgb(var(--pepo-text))] text-[clamp(2.5rem,6vw,5rem)]">
            Kariyer
          </h1>

          <p className="mx-auto max-w-[560px] text-[1rem] leading-[1.9] text-[rgb(var(--pepo-text))]/60">
            PEPO Coffee &amp; Social&apos;da kahveseverlerin hayalini kurduğu bir
            ortamda çalışma fırsatı sizi bekliyor. Tutkulu ve dinamik ekibimize
            katılın.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[rgb(var(--pepo-bg-2))] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {[
              {
                icon: (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ),
                title: "Tutkuyu Paylaş",
                desc: "Kahveye duyduğumuz tutkuyu ekip ruhuyla taşıyoruz.",
              },
              {
                icon: (
                  <svg
                    width="32"
                    height="32"
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
                title: "Birlikte Büyü",
                desc: "Kişisel gelişim ve kariyer fırsatlarıyla ilerliyoruz.",
              },
              {
                icon: (
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                ),
                title: "Kaliteyi Yükselt",
                desc: "Her gün daha iyisini hedefleyen bir standart kültürü.",
              },
            ].map((v) => (
              <div key={v.title} className="flex flex-col items-center">
                <div className="mb-4 text-[rgb(var(--pepo-gold))]">{v.icon}</div>
                <h3 className="mb-3 text-[1.2rem] font-normal text-[rgb(var(--pepo-text))]">
                  {v.title}
                </h3>
                <p className="text-[0.88rem] leading-7 text-[rgb(var(--pepo-text))]/50">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="bg-[rgb(var(--pepo-bg))] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <SectionKicker>AÇIK POZİSYONLAR</SectionKicker>
            <h2 className="font-normal text-[rgb(var(--pepo-text))] text-[clamp(1.8rem,3.5vw,2.8rem)]">
              Aramızdaki Yerini Al
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {positions.map((pos) => {
              const selected = selectedPosition === pos.id;

              return (
                <div
                  key={pos.id}
                  className={[
                    "border p-10 transition",
                    "border-[rgb(var(--pepo-gold))]/20 hover:border-[rgb(var(--pepo-gold))]/40",
                    selected
                      ? "bg-[rgb(var(--pepo-gold))]/[0.04]"
                      : "bg-transparent",
                  ].join(" ")}
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="text-[1.3rem] font-normal text-[rgb(var(--pepo-text))]">
                      {pos.title}
                    </h3>

                    <div className="flex flex-col items-end gap-1">
                      <span className="whitespace-nowrap border border-[rgb(var(--pepo-gold))]/35 px-3 py-1 text-[0.65rem] tracking-[0.15em] text-[rgb(var(--pepo-gold))]">
                        {pos.type}
                      </span>
                      <span className="text-[0.72rem] text-[rgb(var(--pepo-text))]/40">
                        {pos.location}
                      </span>
                    </div>
                  </div>

                  <p className="mb-5 text-[0.88rem] leading-7 text-[rgb(var(--pepo-text))]/55">
                    {pos.desc}
                  </p>

                  <ul className="mb-6 flex flex-col gap-2">
                    {pos.requirements.map((req, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[0.82rem] text-[rgb(var(--pepo-text))]/45"
                      >
                        <span className="shrink-0 text-[rgb(var(--pepo-gold))]">
                          —
                        </span>
                        {req}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => openForm(pos.id)}
                    className="inline-flex items-center border border-[rgb(var(--pepo-gold))]/50 px-7 py-3 text-[0.72rem] tracking-[0.15em] text-[rgb(var(--pepo-gold))] transition hover:bg-[rgb(var(--pepo-gold))] hover:text-[rgb(var(--pepo-bg))]"
                  >
                    BAŞVUR
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section
        id="basvuru-formu"
        className="bg-[rgb(var(--pepo-bg-2))] px-6 py-24"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <SectionKicker>BAŞVURU FORMU</SectionKicker>
            <h2 className="font-normal text-[rgb(var(--pepo-text))] text-[clamp(1.8rem,3.5vw,2.8rem)]">
              İş Başvurusu
            </h2>
            <p className="mt-3 text-[0.9rem] leading-8 text-[rgb(var(--pepo-text))]/50">
              Uygun bir pozisyona başvurmak için formu doldurun. İnsan kaynakları
              ekibimiz sizinle iletişime geçecektir.
            </p>
          </div>

          {submitted ? (
            <div className="border border-[rgb(var(--pepo-gold))]/35 px-8 py-16 text-center">
              <div className="mb-4 text-3xl text-[rgb(var(--pepo-gold))]">✓</div>
              <h3 className="mb-4 text-[1.5rem] font-normal text-[rgb(var(--pepo-text))]">
                Başvurunuz Alındı
              </h3>
              <p className="text-[0.9rem] leading-8 text-[rgb(var(--pepo-text))]/55">
                Teşekkür ederiz! İK ekibimiz başvurunuzu değerlendirip en kısa
                sürede sizinle iletişime geçecektir.
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
                      setForm({ ...form, adSoyad: e.target.value })
                    }
                    placeholder="Adınız Soyadınız"
                    className={baseField}
                    disabled={isSending}
                  />
                  <FieldError>{errors.adSoyad}</FieldError>
                </div>

                <div>
                  <FieldLabel>TELEFON *</FieldLabel>
                  <input
                    type="tel"
                    value={form.telefon}
                    onChange={(e) =>
                      setForm({ ...form, telefon: e.target.value })
                    }
                    placeholder="+90 5__ ___ __ __"
                    className={baseField}
                    disabled={isSending}
                  />
                  <FieldError>{errors.telefon}</FieldError>
                </div>
              </div>

              <div>
                <FieldLabel>E-POSTA *</FieldLabel>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ornek@email.com"
                  className={baseField}
                  disabled={isSending}
                />
                <FieldError>{errors.email}</FieldError>
              </div>

              <div>
                <FieldLabel>BAŞVURMAK İSTEDİĞİNİZ POZİSYON *</FieldLabel>
                <select
                  value={form.pozisyon}
                  onChange={(e) =>
                    setForm({ ...form, pozisyon: e.target.value })
                  }
                  className={baseSelect}
                  style={{ backgroundImage: selectChevronBg }}
                  disabled={isSending}
                >
                  <option value="" className="bg-[rgb(var(--pepo-bg))]">
                    Pozisyon seçiniz
                  </option>
                  {positions.map((p) => (
                    <option
                      key={p.id}
                      value={p.title}
                      className="bg-[rgb(var(--pepo-bg))]"
                    >
                      {p.title}
                    </option>
                  ))}
                </select>
                <FieldError>{errors.pozisyon}</FieldError>
              </div>

              <div>
                <FieldLabel>İLGİLİ DENEYİM (YIL)</FieldLabel>
                <select
                  value={form.deneyim}
                  onChange={(e) =>
                    setForm({ ...form, deneyim: e.target.value })
                  }
                  className={baseSelect}
                  style={{ backgroundImage: selectChevronBg }}
                  disabled={isSending}
                >
                  <option value="" className="bg-[rgb(var(--pepo-bg))]">
                    Seçiniz
                  </option>
                  <option value="yeni" className="bg-[rgb(var(--pepo-bg))]">
                    Deneyim yok / Yeni mezun
                  </option>
                  <option value="1-2" className="bg-[rgb(var(--pepo-bg))]">
                    1–2 yıl
                  </option>
                  <option value="3-5" className="bg-[rgb(var(--pepo-bg))]">
                    3–5 yıl
                  </option>
                  <option value="5+" className="bg-[rgb(var(--pepo-bg))]">
                    5 yıl ve üzeri
                  </option>
                </select>
              </div>

              <div>
                <FieldLabel>KENDİNİZİ TANITIR MISINIZ?</FieldLabel>
                <textarea
                  value={form.mesaj}
                  onChange={(e) => setForm({ ...form, mesaj: e.target.value })}
                  placeholder="Deneyimleriniz, ilgi alanlarınız ve neden PEPO ailesine katılmak istediğinizi kısaca anlatın..."
                  rows={5}
                  className={baseField + " resize-y"}
                  disabled={isSending}
                />
              </div>

              <div>
                <FieldLabel>CV / ÖZGEÇMIŞ (PDF, Link veya Not)</FieldLabel>
                <input
                  type="text"
                  value={form.cvDosya}
                  onChange={(e) =>
                    setForm({ ...form, cvDosya: e.target.value })
                  }
                  placeholder="LinkedIn linkiniz veya CV linkinizi buraya yapıştırabilirsiniz"
                  className={baseField}
                  disabled={isSending}
                />
              </div>

              {serverError ? (
                <div className="border border-[rgb(var(--pepo-gold))]/35 bg-[rgb(var(--pepo-gold))]/[0.04] px-5 py-4 text-[0.85rem] text-[rgb(var(--pepo-text))]/70">
                  {serverError}
                </div>
              ) : null}

              <div className="text-[0.72rem] leading-7 text-[rgb(var(--pepo-text))]/35">
                * Kişisel verileriniz yalnızca işe alım sürecinde kullanılacak ve
                üçüncü taraflarla paylaşılmayacaktır.
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="self-start bg-[rgb(var(--pepo-gold))] px-12 py-4 text-[0.8rem] tracking-[0.25em] text-[rgb(var(--pepo-bg))] transition hover:bg-[rgb(var(--pepo-gold-2))] disabled:opacity-60 disabled:cursor-not-allowed"
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