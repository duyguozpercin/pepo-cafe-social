import { useMemo, useState } from "react";
import { ImageWithFallback } from "../components/ImageWithFallback";

const coffeeImg =
  "https://images.unsplash.com/photo-1763473821509-9a383b480844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const croissantImg =
  "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const dessertImg =
  "https://images.unsplash.com/photo-1740594967618-23cd757b9291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
const sandwichImg =
  "https://images.unsplash.com/photo-1762680850399-c085c8d15afe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";

type Category = "kahve" | "kruvasan" | "tatlilar" | "sandvicler";

const categories: { id: Category; label: string; img: string }[] = [
  { id: "kahve", label: "Kahveler", img: coffeeImg },
  { id: "kruvasan", label: "Kruvasanlar", img: croissantImg },
  { id: "tatlilar", label: "Tatlılar", img: dessertImg },
  { id: "sandvicler", label: "Sandviçler", img: sandwichImg },
];

const menuItems: Record<Category, { name: string; desc: string; price: string }[]> =
  {
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

function PdfButton() {
  return (
    <a
      href="/menu.pdf"
      download
      className="inline-flex items-center gap-2 border border-[rgb(var(--pepo-gold))]/50 px-9 py-3 text-[0.75rem] tracking-[0.2em] text-[rgb(var(--pepo-gold))] transition hover:bg-[rgb(var(--pepo-gold))] hover:text-[rgb(var(--pepo-bg))]"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
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
  onChange: (c: Category) => void;
}) {
  return (
    <section className="sticky top-20 z-30 bg-[rgb(var(--pepo-bg-2))]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex gap-0 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChange(cat.id)}
                className={[
                  "border-b-2 px-8 py-5 text-[0.75rem] tracking-[0.2em] transition",
                  active
                    ? "border-[rgb(var(--pepo-gold))] text-[rgb(var(--pepo-gold))]"
                    : "border-transparent text-[rgb(var(--pepo-text))]/50 hover:text-[rgb(var(--pepo-text))]/70",
                ].join(" ")}
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

function MenuItemCard({
  item,
  isLeftColumn,
}: {
  item: { name: string; desc: string; price: string };
  isLeftColumn: boolean;
}) {
  return (
    <div
      className={[
        "border-b border-[rgb(var(--pepo-gold))]/10 p-7 transition hover:bg-[rgb(var(--pepo-gold))]/[0.04]",
        isLeftColumn ? "md:border-r md:border-[rgb(var(--pepo-gold))]/10" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="mb-1 text-[1.1rem] font-normal text-[rgb(var(--pepo-text))]">
            {item.name}
          </h3>
          <p className="text-[0.82rem] leading-6 text-[rgb(var(--pepo-text))]/50">
            {item.desc}
          </p>
        </div>

        <div className="mt-[0.1rem] shrink-0 text-[1rem] text-[rgb(var(--pepo-gold))]">
          {item.price}
        </div>
      </div>
    </div>
  );
}

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>("kahve");

  const activeCat = useMemo(
    () => categories.find((c) => c.id === activeCategory)!,
    [activeCategory]
  );

  return (
    <div className="min-h-screen bg-[rgb(var(--pepo-bg))]">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-40">
        {/* background blur image */}
        <div
          className="absolute inset-0 opacity-10 transition"
          style={{
            backgroundImage: `url(${activeCat.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px) brightness(0.3)",
          }}
        />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mb-4 text-[0.72rem] tracking-[0.4em] text-[rgb(var(--pepo-gold))]">
            PEPO COFFEE &amp; SOCIAL
          </div>

          <h1 className="mb-4 font-normal leading-[1.1] text-[rgb(var(--pepo-text))] text-[clamp(2.5rem,6vw,5rem)]">
            Menümüz
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-[0.95rem] leading-8 text-[rgb(var(--pepo-text))]/55">
            Her lezzet, özenle seçilmiş malzemeler ve sevgiyle hazırlanır.
          </p>

          <PdfButton />
        </div>
      </section>

      <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />

      {/* Menu items */}
      <section className="bg-[rgb(var(--pepo-bg))] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {menuItems[activeCategory].map((item, i) => (
              <MenuItemCard key={item.name} item={item} isLeftColumn={i % 2 === 0} />
            ))}
          </div>

          {/* Category image */}
          <div className="relative mt-16 h-[280px] overflow-hidden">
            <ImageWithFallback
              src={activeCat.img}
              alt={activeCat.label}
              className="h-full w-full object-cover brightness-[0.45]"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[rgb(var(--pepo-bg))]/85 via-[rgb(var(--pepo-bg))]/30 to-[rgb(var(--pepo-bg))]/85">
              <div className="text-center">
                <div className="mb-3 text-[0.65rem] tracking-[0.4em] text-[rgb(var(--pepo-gold))]">
                  ——— &nbsp; ———
                </div>
                <h2 className="text-[clamp(2rem,5vw,4rem)] font-normal tracking-[0.05em] text-[rgb(var(--pepo-text))]">
                  {activeCat.label}
                </h2>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-[0.72rem] tracking-[0.1em] text-[rgb(var(--pepo-text))]/30">
            * Fiyatlar KDV dahildir. Menü değişiklik gösterebilir.
          </p>
        </div>
      </section>
    </div>
  );
}
