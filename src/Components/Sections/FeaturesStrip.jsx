import features1 from "../../assets/icons/features1.svg";
import features2 from "../../assets/icons/features2.svg";
import features3 from "../../assets/icons/features3.svg";
import features4 from "../../assets/icons/features4.svg";
import features5 from "../../assets/icons/features5.svg";

const FEATURES = [
  {
    icon: features1,
    title: "Best prices & offers",
    subtitle: "Orders $50 or more",
  },
  {
    icon: features2,
    title: "Free delivery",
    subtitle: "24/7 amazing services",
  },
  { icon: features3, title: "Great daily deal", subtitle: "When you sign up" },
  { icon: features4, title: "Wide assortment", subtitle: "Mega Discounts" },
  { icon: features5, title: "Easy returns", subtitle: "Within 30 days" },
];

export default function FeaturesStrip() {
  return (
    <section className="bg-white border-gray-100 border-y">
      <div className="max-w-[1200px] mx-auto px-4 py-5">
        {/* Мобайл: горизонтальный скролл; md+: сетка */}
        <div className="flex gap-3 pb-1 overflow-x-auto scrollbar-hide md:grid md:grid-cols-5 md:overflow-visible md:pb-0 md:gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-2 px-3 py-2 rounded-lg flex-shrink-0
                         hover:bg-gray-50 transition-colors cursor-pointer min-w-[160px] md:min-w-0"
            >
              <img
                src={f.icon}
                alt={f.title}
                className="flex-shrink-0 w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
