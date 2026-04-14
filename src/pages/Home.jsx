import HeroSection      from '../components/sections/HeroSection'
import BannerSection    from '../components/sections/BannerSection'
import PopularProducts  from '../components/sections/PopularProducts'
import DailyBestSells   from '../components/sections/DailyBestSells'
import DealsOfTheDay    from '../components/sections/DealsOfTheDay'
import TopListsSection  from '../components/sections/TopListsSection'
import NewsletterBanner from '../components/sections/NewsletterBanner'
import FeaturesStrip    from '../components/sections/FeaturesStrip'

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
  )
}
