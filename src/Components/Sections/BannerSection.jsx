import { Link } from "react-router-dom";
import banner1 from "../../assets/images/HomeCategory1.png";
import banner2 from "../../assets/images/HomeCategory2.png";
import banner3 from "../../assets/images/HomeCategory3.png";

const BANNERS = [
  {
    id: 1,
    title: "Everyday Fresh & Clean with Our Products",
    image: banner1,
    to: "/shop?category=vegetables",
    bg: "#F5F0E8",
  },
  {
    id: 2,
    title: "Make your Breakfast Healthy and Easy",
    image: banner2,
    to: "/shop?category=dairy-bakery",
    bg: "#FFF0F0",
  },
  {
    id: 3,
    title: "The best Organic Products Online",
    image: banner3,
    to: "/shop?category=organic",
    bg: "#EFF4FB",
  },
];

export default function BannerSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-6 lg:py-8">
      {/* Мобайл: горизонтальный скролл */}
      <div className="flex gap-4 pb-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {BANNERS.map((banner) => (
          <div
            key={banner.id}
            className="relative rounded-xl overflow-hidden flex items-center justify-between
                       px-5 py-5 group flex-shrink-0 w-[75vw] sm:w-[60vw] snap-start
                       md:w-auto"
            style={{ backgroundColor: banner.bg, minHeight: 160 }}
          >
            <div className="z-10 flex-1 pr-3">
              <p className="font-semibold text-gray-800 text-xs sm:text-sm leading-snug mb-3 max-w-[130px]">
                {banner.title}
              </p>
              <Link
                to={banner.to}
                className="inline-block bg-[#E44B26] hover:bg-[#c93f1e] text-white
                           text-xs px-3 py-1.5 rounded transition-colors font-medium no-underline"
              >
                Shop Now
              </Link>
            </div>
            <div className="absolute right-0 flex items-center flex-shrink-0 h-full -translate-y-1/2 top-1/2">
              <img
                src={banner.image}
                alt={banner.title}
                className="object-contain transition-transform duration-300  group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
