import { useState } from "react";
import { usePopularProducts } from "../../Hooks/useProducts";
import { useCategories } from "../../Hooks/useCategories";
import ProductCard from "../Ui/ProductCard";

function SkeletonCard() {
  return (
    <div
      style={{
        borderRadius: 8,
        border: "1px solid #e8e8e8",
        overflow: "hidden",
      }}
      className="animate-pulse"
    >
      <div style={{ height: 190, background: "#f8f8f8" }} />
      <div style={{ padding: "0.875rem 1rem" }} className="space-y-2">
        <div className="w-1/3 h-3 bg-gray-100 rounded" />
        <div className="w-2/3 h-4 bg-gray-100 rounded" />
        <div className="w-1/4 h-3 bg-gray-100 rounded" />
        <div className="h-8 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export default function PopularProducts() {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: products = [], isLoading } = usePopularProducts(20);
  const { data: categories = [] } = useCategories();

  const tabs = ["All", ...categories.map((c) => c.name)];

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.categories?.name === activeCategory);

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1a1a1a" }}>
          Popular Products
        </h2>

        {/* Pill кнопки как в Foodzy */}
        <div className="flex flex-wrap gap-1.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              style={{
                padding: "4px 14px",
                borderRadius: "20px",
                fontSize: "0.8rem",
                fontWeight: activeCategory === tab ? 600 : 400,
                border:
                  activeCategory === tab
                    ? "1px solid #E44B26"
                    : "1px solid #e8e8e8",
                background: activeCategory === tab ? "#E44B26" : "#fff",
                color: activeCategory === tab ? "#fff" : "#7a7a7a",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {!isLoading && filtered.length === 0 && (
        <p className="py-12 text-center text-gray-400">No products found.</p>
      )}
    </section>
  );
}
