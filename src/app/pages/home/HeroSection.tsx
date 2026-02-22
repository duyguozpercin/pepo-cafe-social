import { Link } from "react-router";
import { ImageWithFallback } from "../../components/ImageWithFallback";

const heroImg =
"/banner.jpeg"
export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={heroImg}
          alt="PEPO Coffee Interior"
          className="w-full h-full object-cover filter brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,15,8,0.2)_0%,rgba(26,15,8,0.55)_80%,rgba(26,15,8,1)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="text-[rgb(var(--pepo-gold))] text-[0.72rem] tracking-[0.4em] mb-6 opacity-90">
          İZMİR'İN YENİ BULUŞMA NOKTASI
        </div>

        <h1 className="text-[rgb(var(--pepo-text))] text-[clamp(3rem,9vw,7rem)] leading-[1.05] mb-6 font-normal">
          PEPO
          <br />
          <span className="text-[rgb(var(--pepo-gold))]">Coffee & Social</span>
        </h1>

        <p className="text-[rgba(245,240,232,0.7)] text-[clamp(1rem,2vw,1.2rem)] leading-[1.8] mb-12 max-w-[560px] mx-auto">
          Kahvenin sanatını, sosyal bir atmosferle buluşturduğumuz bu özel mekâna hoş geldiniz.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/menu"
            className="inline-block bg-[#C49A2A] text-[#1A0F08] hover:bg-[rgb(var(--pepo-gold-2))] transition-colors duration-200 py-[0.9rem] px-[2.5rem] text-[0.8rem] tracking-[0.2em] no-underline"
          >
            MENÜYÜ GÖR
          </Link>


          <Link
            to="/franchise"
            className="inline-block border border-[#C49A2A]/60 text-[rgb(var(--pepo-gold))] hover:border-[#C49A2A] hover:text-[hover:bg-[rgb(var(--pepo-gold-2))]] transition-colors duration-200 py-[0.9rem] px-[2.5rem] text-[0.8rem] tracking-[0.2em] no-underline"
          >
            FRANCHISE
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-[50px] bg-[rgba(196,154,42,0.4)] animate-pulse" />
      </div>
    </section>
  );
}
