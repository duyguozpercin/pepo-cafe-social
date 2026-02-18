import { HeroSection } from "./home/HeroSection";
import { AboutSection } from "./home/AboutSection";
import { CategoriesSection } from "./home/CategoriesSection";
import { FranchiseBanner } from "./home/FranchiseBanner";


export function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
      <FranchiseBanner />
    </div>
  );
}
