import "./TvPage.css";

type MenuItemProps = {
  name: string;
  note?: string;
  price: string;
};

function MenuItem({ name, note, price }: MenuItemProps) {
  return (
    <div className="tv-menu-item">
      <span className="tv-item-name">
        {name}
        {note && <span className="tv-item-note">{note}</span>}
      </span>

      <span className="tv-item-price">{price}</span>
    </div>
  );
}

export function TvPage() {
  return (
    <main className="tv-page">
      <div className="tv-video-bg">
        <iframe
          id="youtubePlayer"
          src="https://www.youtube.com/embed/videoseries?list=PL_uLYGDZi5I4QSNXt47MvNJzHPc8wRFWX&autoplay=1&mute=1&controls=0&loop=1&rel=0&modestbranding=1&playsinline=1"
          title="PEPO TV Background Video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="tv-overlay" />

      <div className="tv-grid">
        <div className="tv-column">
          <div className="tv-menu-card">
            <div className="tv-section-title">Espresso Bar</div>

            <div className="tv-menu-items">
              <MenuItem name="Espresso" note="Single" price="110,00 TL" />
              <MenuItem name="Espresso" note="Double" price="150,00 TL" />
              <MenuItem name="Americano" note="Hot / Cold" price="170,00 TL / 180,00 TL" />
              <MenuItem name="Latte" note="Hot / Cold" price="195,00 TL / 205,00 TL" />
              <MenuItem name="Flat White" note="Hot / Cold" price="200,00 TL / 210,00 TL" />
              <MenuItem name="Cortado" price="190,00 TL" />
              <MenuItem name="Cappucino" price="195,00 TL" />
              <MenuItem name="Espresso Macchiato" price="150,00 TL" />
              <MenuItem name="Caramel Macchiato" note="Hot / Cold" price="230,00 TL / 240,00 TL" />
              <MenuItem name="White Mocha" note="Hot / Cold" price="235,00 TL / 245,00 TL" />
              <MenuItem name="Mocha" note="Hot / Cold" price="235,00 TL / 245,00 TL" />
            </div>

            <div className="tv-section-title">Special Brewed</div>

            <div className="tv-menu-items">
              <MenuItem name="Filter Coffee" note="Hot / Cold" price="165,00 TL / 175,00 TL" />
              <MenuItem name="Filter Coffee with Milk" note="Hot / Cold" price="170,00 TL / 180,00 TL" />
              <MenuItem name="Cold Brew" price="210,00 TL" />
              <MenuItem name="Chemex" price="245,00 TL" />
              <MenuItem name="V60" price="245,00 TL" />
            </div>

            <div className="tv-section-title">Extras</div>

            <div className="tv-menu-items">
              <MenuItem name="Shot" price="50,00 TL" />
              <MenuItem name="Vegan Süt" note="Badem, Yulaf" price="60,00 TL" />
              <MenuItem name="Syrup" price="60,00 TL" />
            </div>

            <div className="tv-section-title">Sıcak İçecekler</div>

            <div className="tv-menu-items">
              <MenuItem name="Çay" note="Küçük / Büyük" price="80,00 TL / 95,00 TL" />
              <MenuItem name="Türk Kahvesi" note="Single / Double" price="125,00 TL / 145,00 TL" />
              <MenuItem name="Sıcak Çikolata" price="235,00 TL" />
              <MenuItem name="Salep" price="235,00 TL" />
              <MenuItem name="Chai Tea Latte" price="235,00 TL" />
            </div>
          </div>
        </div>

        <div className="tv-column">
          <div className="tv-menu-card">
            <div className="tv-section-title">Matcha Bar</div>

            <div className="tv-menu-items">
              <MenuItem name="Matcha Latte" note="Hot / Cold" price="250,00 TL / 260,00 TL" />
              <MenuItem name="Strawberry Matcha" note="Hot / Cold" price="265,00 TL / 275,00 TL" />
              <MenuItem name="Coconut Matcha" note="Hot / Cold" price="265,00 TL / 275,00 TL" />
              <MenuItem name="Berry Matcha" note="Not Sugar" price="265,00 TL / 275,00 TL" />
              <MenuItem name="Mojito Matcha" note="Not Sugar" price="265,00 TL / 275,00 TL" />
              <MenuItem name="Mango Matcha" note="Not Sugar" price="265,00 TL / 275,00 TL" />
            </div>

            <div className="tv-section-title">Latte Art</div>

            <div className="tv-menu-items">
              <MenuItem name="Caramel Latte" note="Hot / Cold" price="225,00 TL / 235,00 TL" />
              <MenuItem name="Pistachio Kiss" price="265,00 TL" />
              <MenuItem name="Toffeenut Latte" note="Hot / Cold" price="225,00 TL / 235,00 TL" />
              <MenuItem name="Salted Caramel Latte" note="Hot / Cold" price="225,00 TL / 235,00 TL" />
              <MenuItem name="Madagascar" note="Hot / Cold" price="225,00 TL / 235,00 TL" />
              <MenuItem name="Biscuit Latte" note="Hot / Cold" price="225,00 TL / 235,00 TL" />
              <MenuItem name="Levander Latte" note="Hot / Cold" price="225,00 TL / 235,00 TL" />
              <MenuItem name="Irish Latte" note="Hot / Cold" price="225,00 TL / 235,00 TL" />
              <MenuItem name="Pumpkin Spice Latte" note="Hot / Cold" price="225,00 TL / 235,00 TL" />
            </div>

            <div className="tv-section-title">Fresh Drinks</div>

            <div className="tv-menu-items">
              <MenuItem name="Kuzu Kulağı" price="240,00 TL" />
              <MenuItem name="Cool Lime" price="240,00 TL" />
              <MenuItem name="Berry Hibiscus" price="240,00 TL" />
              <MenuItem name="Sakura White Peach" price="240,00 TL" />
              <MenuItem name="Orange Mango" price="240,00 TL" />
              <MenuItem name="Mango Dragon" price="240,00 TL" />
              <MenuItem name="Strawberry Acai" price="240,00 TL" />
              <MenuItem name="Limonata" price="210,00 TL" />
              <MenuItem name="Churchill" price="165,00 TL" />
            </div>
          </div>
        </div>

        <div className="tv-empty-column" />

        <div className="tv-column">
          <div className="tv-food-card">
            <div className="tv-food-content">
              <div className="tv-section-title">Desert</div>

              <div className="tv-menu-items">
                <MenuItem name="Kruvasan" note="Orman Meyveli, Çilek-muz, Bademli, Antep fıstıklı, Lotuslu" price="385,00 TL" />
                <MenuItem name="Roll Kruvasan" note="Orman Meyveli, Çilek-muz, Bademli, Antep fıstıklı, Lotuslu" price="345,00 TL" />
                <MenuItem name="Marry Cake" price="385,00 TL" />
                <MenuItem name="Matilda" price="385,00 TL" />
                <MenuItem name="Victoria Bowl" price="415,00 TL" />
                <MenuItem name="Baby Bowl" price="295,00 TL" />
                <MenuItem name="San Sebastian" price="260,00 TL" />
                <MenuItem name="Cookie" note="Antep Fıstıklı, Yer fıstıklı, Çikolatalı" price="185,00 TL" />
                <MenuItem name="Nutella Cookie Tart" price="210,00 TL" />
                <MenuItem name="Trio Chocolate Brownie" price="240,00 TL" />
              </div>

              <div className="tv-section-title">Snack Bar</div>

              <div className="tv-menu-items">
                <MenuItem name="Kruvasan Sandwich" note="Hindi Füme, Roastbeef" price="315,00 TL" />
                <MenuItem name="Kruvasan Sandwich" note="Domates Mozzarella" price="295,00 TL" />
                <MenuItem name="Ciabatta Sandwich" note="Hindi Füme, Roastbeef" price="315,00 TL" />
                <MenuItem name="Ciabatta Sandwich" note="Domates Mozzarella" price="295,00 TL" />
                <MenuItem name="Focaccia Sandwich" note="Hindi Füme, Roastbeef" price="315,00 TL" />
                <MenuItem name="Focaccia Sandwich" note="Domates Mozzarella" price="295,00 TL" />
              </div>

              <div className="tv-section-title">Healty Section</div>

              <div className="tv-menu-items">
                <MenuItem name="Chakra Granola Bowl" note="Granola, Süzme Yoğurt, Yulaf, Chia Tohumu, Yaban Mersini, Bal, Muz, Çilek, Frambuaz" price="385,00 TL" />
                <MenuItem name="Ivana Bowl" note="Hindistan Cevizi, Süzme Yoğurt, Yulaf, Chia Tohumu, Keten Tohumu, Yaban Mersini, Frambuaz, Muz" price="385,00 TL" />
                <MenuItem name="Ayala Peanut Bowl" note="Fıstık Ezmesi, Süzme Yoğurt, Yulaf, Chia Tohumu, Ceviz, Bal, Böğürtlen, Muz, Çilek" price="385,00 TL" />
                <MenuItem name="Falafel Salad Bowl" note="Falafel Topları, Mozzarella, Roka, Nane, Ceviz, Kıvırcık, Keten Tohumu, Domates, Salatalık, Mısır" price="385,00 TL" />
              </div>
            </div>

            <div className="tv-footer-brand">
              <img
                src="https://pepocoffee.com/pepologo.png"
                alt="PEPO Coffee & Social"
                className="tv-footer-logo"
              />

              <div className="tv-footer-links">
                <div className="tv-footer-item">
                  <span className="tv-footer-dot"></span>
                  <span>@pepocoffeesocial</span>
                </div>

                <div className="tv-footer-item">
                  <span className="tv-footer-dot"></span>
                  <span>www.pepocoffee.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}