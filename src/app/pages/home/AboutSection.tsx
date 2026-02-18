import { ImageWithFallback } from "../../components/ImageWithFallback";

const baristaImg =
  "https://images.unsplash.com/photo-1770991966683-472a770d0ebf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwYmFyaXN0YSUyMGNvZmZlZSUyMHByZXBhcmF0aW9ufGVufDF8fHx8MTc3MTM2MzgwMnww&ixlib=rb-4.1.0&q=80&w=900";

const stats = [
  { num: "2023", label: "Kuruluş Yılı" },
  { num: "100+", label: "Menü Seçeneği" },
  { num: "∞", label: "Sıcak Atmosfer" },
];

export function AboutSection() {
  return (
    <section style={{ backgroundColor: "#1A0F08" }} className="py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Image */}
        <div className="relative">
          <ImageWithFallback
            src={baristaImg}
            alt="Barista"
            className="w-full h-[520px] object-cover"
            style={{ filter: "brightness(0.85)" }}
          />

          {/* Decorative square */}
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              right: "-20px",
              border: "1px solid rgba(196,154,42,0.4)",
              width: "180px",
              height: "180px",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Right: Text */}
        <div>
          <div
            style={{
              color: "#C49A2A",
              fontSize: "0.72rem",
              letterSpacing: "0.4em",
              marginBottom: "1.2rem",
            }}
          >
            HİKÂYEMİZ
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "#F5F0E8",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
              fontWeight: 400,
            }}
          >
            Kahvenin Ötesinde
            <br />
            <span style={{ color: "#C49A2A" }}>Bir Deneyim</span>
          </h2>

          <p
            style={{
              color: "rgba(245,240,232,0.65)",
              lineHeight: 1.9,
              fontSize: "1rem",
              marginBottom: "1.2rem",
            }}
          >
            PEPO Coffee & Social, yalnızca kahve içilen bir yer değil; düşünülen,
            konuşulan, ilham alınan bir yaşam alanıdır. Her detayda kaliteyi ve
            sıcaklığı hissedeceksiniz.
          </p>

          <p
            style={{
              color: "rgba(245,240,232,0.55)",
              lineHeight: 1.9,
              fontSize: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            Özenle seçilmiş çekirdeklerimiz, taze pişirilen kruvasanlarımız ve el
            yapımı tatlılarımızla her ziyaretinizi özel kılıyoruz.
          </p>

          <div className="flex gap-10">
            {stats.map((item) => (
              <div key={item.label}>
                <div style={{ color: "#C49A2A", fontSize: "1.8rem", lineHeight: 1 }}>
                  {item.num}
                </div>
                <div
                  style={{
                    color: "rgba(245,240,232,0.45)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.1em",
                    marginTop: "0.3rem",
                  }}
                >
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
