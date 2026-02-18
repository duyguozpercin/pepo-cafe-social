import { Link } from "react-router";
import { CategoryCard } from "./CategoryCard";

const coffeeImg =
  "https://images.unsplash.com/photo-1763473821509-9a383b480844?...";

const croissantImg =
  "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?...";

const dessertImg =
  "https://images.unsplash.com/photo-1740594967618-23cd757b9291?...";

const sandwichImg =
  "https://images.unsplash.com/photo-1762680850399-c085c8d15afe?...";

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
    <section style={{ backgroundColor: "#110A04" }} className="py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-16">
          <div
            style={{
              color: "#C49A2A",
              fontSize: "0.72rem",
              letterSpacing: "0.4em",
              marginBottom: "1rem",
            }}
          >
            LEZZETLER
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#F5F0E8",
              fontWeight: 400,
            }}
          >
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
            className="
    inline-block
    border border-[#C49A2A]/50
    text-[#C49A2A]
    hover:bg-[#C49A2A]
    hover:text-[#1A0F08]
    transition-colors duration-200
    py-[0.85rem] px-[3rem]
    text-[0.78rem]
    tracking-[0.2em]
    no-underline
  "
          >
            TÜM MENÜYÜ KEŞFET
          </Link>

        </div>

      </div>
    </section>
  );
}
