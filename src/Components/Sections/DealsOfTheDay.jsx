import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useDeals } from "../../Hooks/useProducts";
import StarRating from "../Ui/StarRating";
import deal1 from "../../assets/images/DealsOfTheDay1.png";
import deal2 from "../../assets/images/DealsOfTheDay2.png";
import deal3 from "../../assets/images/DealsOfTheDay3.png";
import deal4 from "../../assets/images/DealsOfTheDay4.png";

const FALLBACK_IMAGES = [deal1, deal2, deal3, deal4];

function SkeletonDeal() {
  return (
    <div className="flex-shrink-0 overflow-hidden rounded-xl animate-pulse snap-start w-44 sm:w-auto">
      <div className="bg-gray-100 aspect-square" />
      <div className="p-3 space-y-2">
        <div className="w-3/4 h-4 bg-gray-100 rounded" />
        <div className="w-1/2 h-3 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export default function DealsOfTheDay() {
  const { data: deals = [], isLoading } = useDeals(4);

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-8 lg:py-10">
      <div className="flex items-center justify-between mb-5 lg:mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Deals Of The Day
        </h2>
        <Link
          to="/shop?deals=true"
          className="text-sm text-[#E44B26] hover:underline font-medium no-underline"
        >
          All Deals →
        </Link>
      </div>

      {/* Мобайл: горизонтальный скролл; md+: сетка */}
      <div className="flex gap-4 pb-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible md:pb-0 md:gap-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonDeal key={i} />)
          : deals.map((deal, idx) => (
              <DealCard
                key={deal.id}
                deal={deal}
                fallbackImage={FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length]}
              />
            ))}
      </div>
    </section>
  );
}

function DealCard({ deal, fallbackImage }) {
  const { id, name, price, old_price, image_url, rating, review_count, brand } =
    deal;

  return (
    <Link
      to={`/product/${id}`}
      className="relative flex-shrink-0 block overflow-hidden no-underline group rounded-xl bg-gray-50 w-44 sm:w-auto snap-start"
    >
      <div className="overflow-hidden aspect-square">
        <img
          src={image_url || fallbackImage}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3 bg-white">
        <p
          className="text-sm font-medium text-gray-800 line-clamp-2 mb-1
                      group-hover:text-[#E44B26] transition-colors"
        >
          {name}
        </p>
        {brand && <p className="mb-1 text-xs text-gray-400">By {brand}</p>}
        <StarRating rating={rating} count={review_count} />
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-[#E44B26] font-bold text-sm">${price}</span>
            {old_price && (
              <span className="ml-1 text-xs text-gray-400 line-through">
                ${old_price}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="flex items-center gap-1 bg-[#E44B26] hover:bg-[#c93f1e]
                       text-white text-xs px-3 py-1.5 rounded transition-colors"
          >
            <ShoppingCart size={12} />
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}
