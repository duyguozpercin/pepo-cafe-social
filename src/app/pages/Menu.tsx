import { useMemo, useState } from "react";
import { ImageWithFallback } from "../components/ImageWithFallback";

const coffeeImg =
  "https://images.unsplash.com/photo-1763473821509-9a383b480844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";
const croissantImg =
  "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";
const dessertImg =
  "https://images.unsplash.com/photo-1740594967618-23cd757b9291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";
const sandwichImg =
  "https://images.unsplash.com/photo-1762680850399-c085c8d15afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200";

type Category = "kahve" | "kruvasan" | "tatlilar" | "sandvicler";

type MenuItem = { name: string; desc: string; price: string };

const categories: { id: Category; label: string; img: string }[] = [
  { id: "kahve", label: "Kahveler", img: coffeeImg },
  { id: "kruvasan", label: "Kruvasanlar", img: croissantImg },
  { id: "tatlilar", label: "Tatlılar", img: dessertImg },
  { id: "sandvicler", label: "Sandviçler", img: sandwichImg },
];

const menuItems: Record<Category, MenuItem[]> = {
  kahve: [
    { name: "Espresso", desc: "Tek ya da çift shot, yoğun ve aromatik", price: "65₺" },
    { name: "Americano", desc: "Espresso ve sıcak su ile hazırlanan klasik", price: "75₺" },
    { name: "Latte", desc: "Espresso ve buharlandırılmış süt, kremsi doku", price: "95₺" },
    { name: "Cappuccino", desc: "Espresso, süt ve bol sütlü köpük", price: "90₺" },
    { name: "Flat White", desc: "Yoğun espresso ve az köpüklü süt", price: "95₺" },
    { name: "Cortado", desc: "Eşit oranda espresso ve ılık süt", price: "80₺" },
    { name: "Filter Kahve", desc: "V60 ya da chemex ile hazırlanan pour-over", price: "85₺" },
    { name: "Cold Brew", desc: "12 saat soğuk demlenmiş, pürüzsüz tat", price: "105₺" },
    { name: "Matcha Latte", desc: "Seremoni kalitesi matcha ve buharlı süt", price: "110₺" },
    { name: "Karamel Macchiato", desc: "Vanilyalı süt, espresso ve karamel sos", price: "110₺" },
  ],
  kruvasan: [
    { name: "Sade Kruvasan", desc: "Her sabah taze pişirilen, çıtır katmanlı", price: "75₺" },
    { name: "Tereyağlı Kruvasan", desc: "Fransız usulü, altın rengi çıtır hamur", price: "80₺" },
    { name: "Çikolatalı Kruvasan", desc: "İçine gömülü Belçika çikolatasıyla", price: "90₺" },
    { name: "Badem Kremalı Kruvasan", desc: "Badem ezmesi ve pudra şekerli", price: "95₺" },
    { name: "Peynirli Açma", desc: "Beyaz peynir dolgulu, ince hamur", price: "85₺" },
    { name: "Pain au Chocolat", desc: "Çikolata çubuklu, kıtır milföy hamuru", price: "95₺" },
  ],
  tatlilar: [
    { name: "Cheesecake", desc: "Klasik New York usulü, taze meyve soslu", price: "130₺" },
    { name: "Tiramisu", desc: "Mascarpone ve espresso ile hazırlanan İtalyan klasiği", price: "125₺" },
    { name: "Çikolatalı Brownie", desc: "Yoğun bitter çikolata, fındıklı", price: "110₺" },
    { name: "Madeleine", desc: "Tereyağlı Fransız keki, limon aromalı", price: "75₺" },
    { name: "Eclair", desc: "Çikolata soslu, vanilyalı ekler pasta", price: "115₺" },
    { name: "Tarte Tatin", desc: "Karamelize elma turtası, taze kremşanti", price: "120₺" },
    { name: "Crème Brûlée", desc: "Vanilyalı panna cotta benzeri klasik", price: "135₺" },
  ],
  sandvicler: [
    { name: "Pepo Klasik", desc: "Dana jambon, cheddar, roka, domates, özel sos", price: "145₺" },
    { name: "Avokado Toast", desc: "Ekşi maya ekmek, ezme avokado, poşe yumurta", price: "155₺" },
    { name: "BLT Sandviç", desc: "Bacon, marul, domates, aioli sos", price: "160₺" },
    { name: "Caprese Panini", desc: "Taze mozzarella, domates, fesleğen", price: "135₺" },
    { name: "Smoked Salmon Bagel", desc: "Füme somon, krem peynir, kapari, dereotu", price: "175₺" },
    { name: "Mantarlı Cheddar Tost", desc: "Sote mantar, eritilmiş cheddar, ciabatta", price: "140₺" },
  ],
};

function DownloadButton() {
  return (
    <a
      href="/menu.pdf"
      download
      className="inline-flex items-center gap-2 border border-[#C49A2A]/50 text-[#C49A2A] px-8 py-3
                 tracking-[0.2em] text-[0.75rem] transition hover:bg-[#C49A2A] hover:text-[#1A0F08]"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      MENÜYÜ PDF OLARAK İNDİR
    </a>
  );
}

function CategoryTabs({
  activeCategory,
  onChange,
}: {
  activeCategory: Category;
  onChange: (cat: Category) => void;
}) {
  return (
    <section className="sticky top-20 z-30 bg-[#110A04]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex overflow-x-auto gap-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onChange(cat.id)}
                className={[
                  "bg-transparent border-0 whitespace-nowrap font-serif",
                  "px-8 py-5 text-[0.75rem] tracking-[0.2em] transition",
                  isActive
                    ? "text-[#C49A2A] border-b-2 border-[#C49A2A]"
                    : "text-[rgba(245,240,232,0.55)] border-b-2 border-transparent hover:text-[#C49A2A]",
                ].join(" ")}
                style={{ fontFamily: "'Forum', serif" }}
              >
                {cat.label.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MenuGrid({ items }: { items: MenuItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
      {items.map((item, i) => (
        <div
          key={item.name}
          className={[
            "px-8 py-7 transition",
            "border-b border-[#C49A2A]/10",
            "hover:bg-[#C49A2A]/[0.04]",
            // md+ sağ border sadece sol kolonda
            i % 2 === 0 ? "md:border-r md:border-[#C49A2A]/10" : "",
          ].join(" ")}
        >
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-[#F5F0E8] text-[1.1rem] font-normal mb-2" style={{ fontFamily: "'Forum', serif" }}>
                {item.name}
              </h3>
              <p className="text-[rgba(245,240,232,0.55)] text-[0.82rem] leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="text-[#C49A2A] text-[1rem] shrink-0 mt-[2px]">{item.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CategoryBanner({ title, img }: { title: string; img: string }) {
  return (
    <div className="mt-16 relative overflow-hidden h-[280px]">
      <ImageWithFallback
        src={img}
        alt={title}
        className="w-full h-full object-cover"
        style={{ filter: "brightness(0.45)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#1A0F08]/90 via-[#1A0F08]/35 to-[#1A0F08]/90">
        <div className="text-center">
          <div className="text-[#C49A2A] text-[0.65rem] tracking-[0.4em] mb-3">• • •</div>
          <h2 className="text-[#F5F0E8] font-normal tracking-[0.05em]" style={{ fontFamily: "'Forum', serif", fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
}

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>("kahve");

  const categoryById = useMemo(() => {
    const map = new Map<Category, { id: Category; label: string; img: string }>();
    categories.forEach((c) => map.set(c.id, c));
    return map;
  }, []);

  const activeCat = categoryById.get(activeCategory)!;
  const items = menuItems[activeCategory];

  return (
    <div className="min-h-screen bg-[#1A0F08] text-white" style={{ fontFamily: "'Forum', serif" }}>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* background image layer */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${activeCat.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // burası ağır gelirse blur’u 0 yap veya kaldır
            filter: "blur(6px) brightness(0.35)",
            transition: "background-image 300ms ease",
          }}
        />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="text-[#C49A2A] text-[0.72rem] tracking-[0.4em] mb-4">PEPO COFFEE & SOCIAL</div>
          <h1 className="text-[#F5F0E8] font-normal leading-[1.1] mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Menümüz
          </h1>
          <p className="text-[rgba(245,240,232,0.6)] text-[0.95rem] leading-[1.9] mb-10">
            Her lezzet, özenle seçilmiş malzemeler ve sevgiyle hazırlanır.
          </p>

          <DownloadButton />
        </div>
      </section>

      <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />

      {/* Menu items */}
      <section className="py-16 px-6 bg-[#1A0F08]">
        <div className="max-w-7xl mx-auto">
          <MenuGrid items={items} />

          <CategoryBanner title={activeCat.label} img={activeCat.img} />

          <p className="text-[rgba(245,240,232,0.35)] text-[0.72rem] text-center tracking-[0.1em] mt-8">
            * Fiyatlar KDV dahildir. Menü değişiklik gösterebilir.
          </p>
        </div>
      </section>
    </div>
  );
}
