import { Link } from "react-router";

export function FranchiseBanner() {
  return (
    <section className="relative overflow-hidden bg-[rgb(var(--pepo-bg))] py-24 px-6">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(0deg,#C49A2A_0,#C49A2A_1px,transparent_1px,transparent_60px),repeating-linear-gradient(90deg,#C49A2A_0,#C49A2A_1px,transparent_1px,transparent_60px)]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="text-[rgb(var(--pepo-gold))] text-[0.72rem] tracking-[0.4em] mb-[1.2rem]">
          FRANCHİSE FIRSATI
        </div>

        <h2 className="text-[rgb(var(--pepo-text))] text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.2] mb-6">
          PEPO Ailesinin
          <br />
          <span className="text-[rgb(var(--pepo-gold))]">Bir Parçası Olun</span>
        </h2>

        <p className="text-[rgba(245,240,232,0.6)] text-[1rem] leading-[1.9] max-w-[560px] mx-auto mb-10">
          PEPO Coffee & Social franchise sistemiyle kendi işinizi kurma fırsatını
          kaçırmayın. Güçlü marka desteğimizle başarıya giden yolu birlikte inşa
          edelim.
        </p>

        <Link
          to="/franchise"
          className="inline-block bg-[#C49A2A] text-[#1A0F08] hover:bg-[hover:bg-[rgb(var(--pepo-gold-2))]] transition-colors duration-200 py-[1rem] px-[3rem] text-[0.8rem] tracking-[0.2em] no-underline"
        >
          FRANCHISE BAŞVURUSU
        </Link>
      </div>
    </section>
  );
}
