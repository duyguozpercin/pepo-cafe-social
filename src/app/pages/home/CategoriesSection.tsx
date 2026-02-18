import { Link } from "react-router";
import { CategoryCard } from "./CategoryCard";

const coffeeImg =
  "https://images.unsplash.com/photo-1763473821509-9a383b480844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGxhdHRlJTIwYXJ0JTIwY2xvc2UlMjB1cCUyMGRhcmt8ZW58MXx8fHwxNzcxMzYzNzk4fDA&ixlib=rb-4.1.0&q=80&w=600";

const croissantImg =
  "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnklMjBjYWZlJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcxMzYzNzk4fDA&ixlib=rb-4.1.0&q=80&w=600";

const dessertImg =
  "https://images.unsplash.com/photo-1740594967618-23cd757b9291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwY2FrZSUyMGRhcmslMjBlbGVnYW50fGVufDF8fHx8MTc3MTM2MzgwMXww&ixlib=rb-4.1.0&q=80&w=600";

const sandwichImg =
  "https://images.unsplash.com/photo-1762680850399-c085c8d15afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwc2FuZHdpY2glMjBjYWZlJTIwZm9vZCUyMGRhcmslMjBtb29keXxlbnwxfHx8fDE3NzEzNjM3OTl8MA&ixlib=rb-4.1.0&q=80&w=600";

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
          <div className="text-[#C49A2A] text-[0.72rem] tracking-[0.4em] mb-4">
            LEZZETLER
          </div>

          <h2 className="text-[#F5F0E8] text-[clamp(2rem,4vw,3rem)] font-normal">
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
            className="inline-block border border-[#C49A2A]/50 text-[#C49A2A] hover:bg-[#C49A2A] hover:text-[#1A0F08] transition-colors duration-200 py-[0.85rem] px-[3rem] text-[0.78rem] tracking-[0.2em] no-underline"
          >
            TÜM MENÜYÜ KEŞFET
          </Link>
        </div>
      </div>
    </section>
  );
}
