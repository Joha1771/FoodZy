import HeroSection from "../Components/sections/HeroSection";
import BannerSection from "../Components/sections/BannerSection";
import PopularProducts from "../Components/sections/PopularProducts";
import DailyBestSells from "../Components/sections/DailyBestSells";
import DealsOfTheDay from "../Components/sections/DealsOfTheDay";
import TopListsSection from "../Components/sections/TopListsSection";
import NewsletterBanner from "../Components/sections/NewsletterBanner";
import FeaturesStrip from "../Components/sections/FeaturesStrip";

/**
 * Главная страница.
 * Собирает все секции в правильном порядке как на макете.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <BannerSection />
      <PopularProducts />
      <DailyBestSells />
      <DealsOfTheDay />
      <TopListsSection />
      <NewsletterBanner />
      <FeaturesStrip />
    </>
  );
}
