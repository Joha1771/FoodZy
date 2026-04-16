import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import useWishlistStore from "../Store/wishlistStore";
import useCartStore from "../Store/cartStore";
import ProductCard from "../Components/Ui/ProductCard";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  function handleMoveToCart(product) {
    addItem(product);
    removeItem(product.id);
  }

  return (
    <div className="min-h-[60vh]">
      {/* Banner */}
      <div className="bg-[#E44B26] text-white py-3">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between">
          <h1 className="text-base font-bold">Wishlist</h1>
          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="no-underline transition-colors text-white/80 hover:text-white"
            >
              Home
            </Link>
            <span className="text-white/50">—</span>
            <span>Wishlist</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {items.length === 0 ? (
          /* Пустой вишлист */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={64} className="mb-4 text-gray-200" />
            <h2 className="mb-2 text-xl font-bold text-gray-800">
              Your wishlist is empty
            </h2>
            <p className="mb-6 text-sm text-gray-400">
              Save items you love and come back to them anytime.
            </p>
            <Link
              to="/shop"
              className="bg-[#E44B26] hover:bg-[#c93f1e] text-white font-semibold px-6 py-2.5 rounded-lg no-underline transition-colors"
            >
              Go To Shop
            </Link>
          </div>
        ) : (
          <>
            {/* Заголовок */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                My Wishlist
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({items.length} {items.length === 1 ? "item" : "items"})
                </span>
              </h2>
              <button
                onClick={clearWishlist}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#E44B26] transition-colors border-none bg-transparent cursor-pointer"
              >
                <Trash2 size={14} />
                Clear all
              </button>
            </div>

            {/* Сетка товаров */}
            <div
              className="grid gap-5"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              }}
            >
              {items.map((product) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />

                  {/* Кнопка "Move to cart" снизу */}
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="mt-2 w-full text-xs font-semibold text-[#E44B26] border border-[#E44B26] rounded-lg py-1.5 bg-white hover:bg-[#E44B26] hover:text-white transition-colors cursor-pointer"
                  >
                    Move to Cart
                  </button>
                </div>
              ))}
            </div>

            {/* Ссылка в магазин */}
            <div className="mt-10 text-center">
              <Link
                to="/shop"
                className="text-sm text-[#E44B26] hover:underline no-underline font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
