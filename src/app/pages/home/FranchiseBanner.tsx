import { Link } from "react-router";

export function FranchiseBanner() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor: "#1A0F08" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #C49A2A 0, #C49A2A 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C49A2A 0, #C49A2A 1px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <div
          style={{
            color: "#C49A2A",
            fontSize: "0.72rem",
            letterSpacing: "0.4em",
            marginBottom: "1.2rem",
          }}
        >
          FRANCHİSE FIRSATI
        </div>

        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            color: "#F5F0E8",
            fontWeight: 400,
            lineHeight: 1.2,
            marginBottom: "1.5rem",
          }}
        >
          PEPO Ailesinin
          <br />
          <span style={{ color: "#C49A2A" }}>Bir Parçası Olun</span>
        </h2>

        <p
          style={{
            color: "rgba(245,240,232,0.6)",
            fontSize: "1rem",
            lineHeight: 1.9,
            margin: "0 auto 2.5rem",
            maxWidth: "560px",
          }}
        >
          PEPO Coffee & Social franchise sistemiyle kendi işinizi kurma fırsatını
          kaçırmayın. Güçlü marka desteğimizle başarıya giden yolu birlikte inşa
          edelim.
        </p>

        <Link
          to="/franchise"
          className="
    inline-block
    bg-[#C49A2A] text-[#1A0F08]
    hover:bg-[#D4AA3A]
    transition-colors duration-200
    py-[1rem] px-[3rem]
    text-[0.8rem]
    tracking-[0.2em]
    no-underline
  ">
          FRANCHISE BAŞVURUSU
        </Link>

      </div>
    </section>
  );
}
