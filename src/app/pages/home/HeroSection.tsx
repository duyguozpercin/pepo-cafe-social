import { Link } from "react-router";
import { ImageWithFallback } from "../../components/ImageWithFallback";

const heroImg =
  "https://images.unsplash.com/photo-1542520698-eec198b78a09?...";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src={heroImg}
          alt="PEPO Coffee Interior"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.35)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,15,8,0.2) 0%, rgba(26,15,8,0.55) 80%, rgba(26,15,8,1) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div
          style={{
            color: "#C49A2A",
            fontSize: "0.72rem",
            letterSpacing: "0.4em",
            marginBottom: "1.5rem",
            opacity: 0.9,
          }}
        >
          İZMİR'İN YENİ BULUŞMA NOKTASI
        </div>

        <h1
          style={{
            fontSize: "clamp(3rem, 9vw, 7rem)",
            color: "#F5F0E8",
            lineHeight: 1.05,
            marginBottom: "1.5rem",
            fontWeight: 400,
          }}
        >
          PEPO 
          <br />
          <span style={{ color: "#C49A2A" }}>Coffee & Social</span>
        </h1>

        <p
          style={{
            color: "rgba(245,240,232,0.7)",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.8,
            margin: "0 auto 3rem",
            maxWidth: "560px",
          }}
        >
          Kahvenin sanatını, sosyal bir atmosferle buluşturduğumuz bu özel mekâna hoş geldiniz.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/menu"
            style={{
              backgroundColor: "#C49A2A",
              color: "#1A0F08",
              padding: "0.9rem 2.5rem",
              letterSpacing: "0.2em",
              fontSize: "0.8rem",
              textDecoration: "none",
            }}
          >
            MENÜYÜ GÖR
          </Link>

          <Link
            to="/franchise"
            style={{
              border: "1px solid rgba(196,154,42,0.6)",
              color: "#C49A2A",
              padding: "0.9rem 2.5rem",
              letterSpacing: "0.2em",
              fontSize: "0.8rem",
              textDecoration: "none",
            }}
          >
            FRANCHISE
          </Link>
        </div>
      </div>
    </section>
  );
}
