import { ImageWithFallback } from "../../components/ImageWithFallback";

const baristaImg =
"banner.jpeg";
const stats = [
  { num: "2025", label: "Kuruluş Yılı" },
  { num: "100+", label: "Menü Seçeneği" },
  { num: "∞", label: "Sıcak Atmosfer" },
];

export function AboutSection() {
  return (
    <section className="bg-[rgb(var(--pepo-bg))] py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Image */}
        <div className="relative">
          <ImageWithFallback
            src={baristaImg}
            alt="Barista"
            className="w-full h-[520px] object-cover filter brightness-[0.85]"
          />

          {/* Decorative square */}
          <div className="pointer-events-none absolute -bottom-5 -right-5 w-[180px] h-[180px] border border-[#C49A2A]/40" />
        </div>

        {/* Right: Text */}
        <div>
          <div className="text-[rgb(var(--pepo-gold))] text-[0.72rem] tracking-[0.4em] mb-[1.2rem]">
            HİKÂYEMİZ
          </div>

          <h2 className="text-[rgb(var(--pepo-text))] text-[clamp(2rem,4vw,3.2rem)] leading-[1.2] mb-6 font-normal">
            Kahvenin Ötesinde
            <br />
            <span className="text-[rgb(var(--pepo-gold))]">Bir Deneyim</span>
          </h2>

          <p className="text-[rgba(245,240,232,0.65)] leading-[1.9] text-[1rem] mb-[1.2rem]">
            PEPO Coffee & Social, yalnızca kahve içilen bir yer değil; düşünülen,
            konuşulan, ilham alınan bir yaşam alanıdır. Her detayda kaliteyi ve
            sıcaklığı hissedeceksiniz.
          </p>

          <p className="text-[rgba(245,240,232,0.55)] leading-[1.9] text-[1rem] mb-10">
            Özenle seçilmiş çekirdeklerimiz, taze pişirilen kruvasanlarımız ve el
            yapımı tatlılarımızla her ziyaretinizi özel kılıyoruz.
          </p>

          <div className="flex gap-10">
            {stats.map((item) => (
              <div key={item.label}>
                <div className="text-[rgb(var(--pepo-gold))] text-[1.8rem] leading-none">
                  {item.num}
                </div>
                <div className="text-[rgba(245,240,232,0.45)] text-[0.72rem] tracking-[0.1em] mt-[0.3rem]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
