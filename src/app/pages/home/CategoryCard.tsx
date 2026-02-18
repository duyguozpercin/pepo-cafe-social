import { ImageWithFallback } from "../../components/ImageWithFallback";

type CategoryCardProps = {
  label: string;
  img: string;
  desc: string;
};

export function CategoryCard({ label, img, desc }: CategoryCardProps) {
  return (
    <div className="group overflow-hidden relative cursor-default">
      <div className="overflow-hidden h-[320px]">
        <ImageWithFallback
          src={img}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "brightness(0.6)" }}
        />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 p-6"
        style={{
          background:
            "linear-gradient(to top, rgba(26,15,8,0.95) 0%, transparent 100%)",
        }}
      >
        <div
          style={{
            color: "#C49A2A",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            marginBottom: "0.4rem",
          }}
        >
          ——
        </div>

        <h3
          style={{
            color: "#F5F0E8",
            fontSize: "1.3rem",
            fontWeight: 400,
            marginBottom: "0.5rem",
          }}
        >
          {label}
        </h3>

        <p
          style={{
            color: "rgba(245,240,232,0.6)",
            fontSize: "0.82rem",
            lineHeight: 1.7,
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
