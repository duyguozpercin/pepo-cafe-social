import { ImageWithFallback } from "../../components/ImageWithFallback";

type CategoryCardProps = {
  label: string;
  img: string;
  desc: string;
};

export function CategoryCard({ label, img, desc }: CategoryCardProps) {
  return (
    <div className="group relative overflow-hidden cursor-default">
      <div className="overflow-hidden h-[320px]">
        <ImageWithFallback
          src={img}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06] filter brightness-[0.6] group-hover:brightness-[0.75]"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-[linear-gradient(to_top,rgba(26,15,8,0.95)_0%,transparent_100%)]">
        <div className="text-[rgb(var(--pepo-gold))] text-[0.65rem] tracking-[0.3em] mb-[0.4rem]">
          ——
        </div>

        <h3 className="text-[rgb(var(--pepo-text))] text-[1.3rem] font-normal mb-2">
          {label}
        </h3>

        <p className="text-[rgba(245,240,232,0.6)] text-[0.82rem] leading-[1.7]">
          {desc}
        </p>
      </div>
    </div>
  );
}
