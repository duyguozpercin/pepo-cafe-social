import { HeroSection } from "./home/HeroSection";
import { AboutSection } from "./home/AboutSection";
import { CategoriesSection } from "./home/CategoriesSection";

export function Home() {
  return (
    <div style={{ fontFamily: "'Forum', serif" }}>
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
    </div>
  );
}
