import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Phone,
  Menu,
  X,
} from "lucide-react";
import useCartStore from "../../Store/cartStore";
import useWishlistStore from "../../Store/wishlistStore";
import logo from "../../assets/icons/logo.svg";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Blog", to: "/blog" },
  { label: "FAQ", to: "/faq" },
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartItems = useCartStore((s) => s.items);
  const totalCartItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const totalWishlistItems = useWishlistStore((s) => s.getTotalItems());

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* ── Верхняя строка ── */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-9">
          <button
            className="text-gray-500 lg:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav className="items-center hidden gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-gray-600 hover:text-[#E44B26] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href="tel:+1234567890"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#E44B26]"
          >
            <Phone size={13} />
            +123 (456) 7890
          </a>
        </div>
      </div>

      {/* ── Нижняя строка ── */}
      <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-4 h-16">
        <Link to="/" className="flex items-center flex-shrink-0 gap-2">
          <img src={logo} alt="Foodzy" />
        </Link>

        <form onSubmit={handleSearch} className="flex flex-1 max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for items..."
            className="flex-1 border border-gray-200 rounded-l-md px-4 py-2 text-sm
                       focus:outline-none focus:border-[#E44B26] transition-colors"
          />
          <select className="px-3 text-sm text-gray-500 bg-white border-gray-200 border-y focus:outline-none">
            <option>All Categories</option>
          </select>
          <button
            type="submit"
            className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-4 rounded-r-md transition-colors flex items-center"
            aria-label="Поиск"
          >
            <Search size={16} />
          </button>
        </form>

        {/* Иконки */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Аккаунт */}
          <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E44B26] transition-colors">
            <User size={18} />
            <span className="hidden md:inline">Account</span>
          </button>

          {/* Вишлист — теперь Link с счётчиком */}
          <Link
            to="/wishlist"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E44B26] transition-colors relative"
          >
            <div className="relative">
              <Heart size={18} />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E44B26] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalWishlistItems > 9 ? "9+" : totalWishlistItems}
                </span>
              )}
            </div>
            <span className="hidden md:inline">Wishlist</span>
          </Link>

          {/* Корзина */}
          <Link
            to="/cart"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E44B26] transition-colors relative"
          >
            <div className="relative">
              <ShoppingCart size={18} />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E44B26] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalCartItems > 9 ? "9+" : totalCartItems}
                </span>
              )}
            </div>
            <span className="hidden md:inline">Cart</span>
          </Link>
        </div>
      </div>

      {/* ── Мобильное меню ── */}
      {mobileMenuOpen && (
        <nav className="flex flex-col gap-3 px-4 py-3 bg-white border-t border-gray-100 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-gray-700 hover:text-[#E44B26] py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-gray-700 hover:text-[#E44B26] py-1"
          >
            Wishlist
          </Link>
        </nav>
      )}
    </header>
  );
}
