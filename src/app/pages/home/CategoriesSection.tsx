import { Link } from "react-router";
import { ImageWithFallback } from "../../components/ImageWithFallback";

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
            <div
              key={cat.label}
              className="group overflow-hidden relative cursor-default"
            >
              <div className="overflow-hidden h-[320px]">
                <ImageWithFallback
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700"
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
                  {cat.label}
                </h3>

                <p
                  style={{
                    color: "rgba(245,240,232,0.6)",
                    fontSize: "0.82rem",
                    lineHeight: 1.7,
                  }}
                >
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/menu"
            style={{
              border: "1px solid rgba(196,154,42,0.5)",
              color: "#C49A2A",
              padding: "0.85rem 3rem",
              letterSpacing: "0.2em",
              fontSize: "0.78rem",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            TÜM MENÜYÜ KEŞFET
          </Link>
        </div>

      </div>
    </section>
  );
}
