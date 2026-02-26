import { Link } from "react-router";
import { CategoryCard } from "./CategoryCard";

const coffeeImg =
  "coffee-800.webp";
const croissantImg =
  "kruvasan.webp";
const dessertImg =
  "tatli.png";
const sandwichImg =
  "sandvic.png"
const categories = [
  {
    label: "Kahveler",
    img: coffeeImg,
    desc: "Özenle seçilmiş çekirdeklerden hazırlanan espresso bazlı içecekler ve özel demlemeler.",
  },
  {
    label: "Kruvasanlar",
    img: croissantImg,
    desc: "Her gün taze pişirilen, katmanlı ve çıtır kruvasanlar.",
  },
  {
    label: "Tatlılar",
    img: dessertImg,
    desc: "El yapımı pastalar, cheesecake ve mevsimsel tatlılar.",
  },
  {
    label: "Sandviçler",
    img: sandwichImg,
    desc: "Günlük malzemelerle hazırlanan doyurucu gourmet sandviçler.",
  },
];

export function CategoriesSection() {
  return (
    <section className="bg-[#110A04] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="text-[rgb(var(--pepo-gold))] text-[0.72rem] tracking-[0.4em] mb-4">
            LEZZETLER
          </div>

          <h2 className="text-[rgb(var(--pepo-text))] text-[clamp(2rem,4vw,3rem)] font-normal">
            Menümüzden Seçkiler
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.label} {...cat} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/menu"
            className="inline-block border border-[#C49A2A]/50 text-[rgb(var(--pepo-gold))] hover:bg-[#C49A2A] hover:text-[#1A0F08] transition-colors duration-200 py-[0.85rem] px-[3rem] text-[0.78rem] tracking-[0.2em] no-underline"
          >
            TÜM MENÜYÜ KEŞFET
          </Link>
        </div>
      </div>
    </section>
  );
}
