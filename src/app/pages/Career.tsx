import { useState } from "react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import { DynamicForm } from "../components/DynamicForm";

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

const selectChevronBg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%23C49A2A' stroke-width='1.5' fill='none'/></svg>")`;

const baseField =
  "w-full bg-[rgb(var(--pepo-text))]/[0.04] border border-[rgb(var(--pepo-gold))]/25 px-5 py-[0.85rem] text-[0.95rem] text-[rgb(var(--pepo-text))] outline-none transition focus:border-[rgb(var(--pepo-gold))]/70";

const baseSelect =
  baseField +
  " appearance-none cursor-pointer bg-no-repeat bg-[right_1rem_center] pr-12";

const labelClass = "mb-2 block text-[0.72rem] tracking-[0.2em] text-[rgb(var(--pepo-text))]/65 uppercase";

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 text-[0.72rem] tracking-[0.4em] text-[rgb(var(--pepo-gold))]">
      {children}
    </div>
  );
}

export function Career() {
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const openForm = (positionTitle: string) => {
    setSelectedPosition(positionTitle);
    // Formun bulunduğu bölüme kaydır
    document.getElementById("basvuru-formu")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCareerSubmit = async (formData: FormData) => {
    const res = await fetch("/api/send-email", {
      method: "POST",
      // Not: FormData gönderirken Content-Type başlığı eklemeyin!
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Sunucu hatası");
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
            ortamda çalışma fırsatı sizi bekliyor.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[rgb(var(--pepo-bg-2))] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {[
              { title: "Tutkuyu Paylaş", desc: "Kahveye duyduğumuz tutkuyu ekip ruhuyla taşıyoruz." },
              { title: "Birlikte Büyü", desc: "Kişisel gelişim ve kariyer fırsatlarıyla ilerliyoruz." },
              { title: "Kaliteyi Yükselt", desc: "Her gün daha iyisini hedefleyen bir standart kültürü." },
            ].map((v) => (
              <div key={v.title} className="flex flex-col items-center">
                <h3 className="mb-3 text-[1.2rem] font-normal text-[rgb(var(--pepo-text))]">{v.title}</h3>
                <p className="text-[0.88rem] leading-7 text-[rgb(var(--pepo-text))]/50">{v.desc}</p>
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
            {positions.map((pos) => (
              <div key={pos.id} className="border border-[rgb(var(--pepo-gold))]/20 p-10 transition hover:border-[rgb(var(--pepo-gold))]/40">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-[1.3rem] font-normal text-[rgb(var(--pepo-text))]">{pos.title}</h3>
                  <span className="border border-[rgb(var(--pepo-gold))]/35 px-3 py-1 text-[0.65rem] tracking-[0.15em] text-[rgb(var(--pepo-gold))] uppercase">{pos.type}</span>
                </div>
                <p className="mb-5 text-[0.88rem] leading-7 text-[rgb(var(--pepo-text))]/55">{pos.desc}</p>
                <ul className="mb-6 flex flex-col gap-2">
                  {pos.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.82rem] text-[rgb(var(--pepo-text))]/45">
                      <span className="text-[rgb(var(--pepo-gold))]">—</span>{req}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openForm(pos.title)}
                  className="border border-[rgb(var(--pepo-gold))]/50 px-7 py-3 text-[0.72rem] tracking-[0.15em] text-[rgb(var(--pepo-gold))] transition hover:bg-[rgb(var(--pepo-gold))] hover:text-[rgb(var(--pepo-bg))]"
                >
                  BAŞVUR
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="basvuru-formu" className="bg-[rgb(var(--pepo-bg-2))] px-6 py-24">
        <DynamicForm
          type="KARİYER"
          title="İş Başvurusu"
          description="Uygun bir pozisyona başvurmak için formu doldurun. İK ekibimiz sizinle iletişime geçecektir."
          onSubmit={handleCareerSubmit}
        >
          {/* Pozisyon ve Deneyim Yan Yana */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={labelClass}>BAŞVURULAN POZİSYON *</label>
              <select
                name="pozisyon"
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className={baseSelect}
                style={{ backgroundImage: selectChevronBg }}
              >
                <option value="" className="bg-[rgb(var(--pepo-bg))]">Seçiniz</option>
                {positions.map((p) => (
                  <option key={p.id} value={p.title} className="bg-[rgb(var(--pepo-bg))]">{p.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>DENEYİM SÜRESİ</label>
              <select
                name="deneyim"
                className={baseSelect}
                style={{ backgroundImage: selectChevronBg }}
              >
                <option value="" className="bg-[rgb(var(--pepo-bg))]">Seçiniz</option>
                <option value="yeni" className="bg-[rgb(var(--pepo-bg))]">Yeni Mezun</option>
                <option value="1-2" className="bg-[rgb(var(--pepo-bg))]">1-2 Yıl</option>
                <option value="3-5" className="bg-[rgb(var(--pepo-bg))]">3-5 Yıl</option>
                <option value="5+" className="bg-[rgb(var(--pepo-bg))]">5 Yıl+</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className={labelClass}>CV / ÖZGEÇMİŞ YÜKLE (PDF/DOCX) *</label>
            <div className="relative group">
              <input
                name="cvFile"
                type="file"
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => {
                  const fileName = e.target.files?.[0]?.name;
                  const label = document.getElementById("file-label");
                  if (label && fileName) label.innerText = fileName;
                }}
              />
              <div className="w-full bg-[rgb(var(--pepo-text))]/[0.04] border border-[rgb(var(--pepo-gold))]/25 px-5 py-[0.85rem] text-[0.95rem] text-[rgb(var(--pepo-text))]/40 flex justify-between items-center group-hover:border-[rgb(var(--pepo-gold))]/70 transition">
                <span id="file-label">Dosya seçilmedi...</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-[0.65rem] text-[rgb(var(--pepo-text))]/30 uppercase tracking-widest">
              Maksimum dosya boyutu: 5MB
            </p>
          </div>
        </DynamicForm>
      </section>
    </div>
  );
}