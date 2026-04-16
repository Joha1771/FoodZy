import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Phone,
  Menu,
  X,
  Home,
  ShoppingBag,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import useCartStore from "../../Store/cartStore";
import useWishlistStore from "../../Store/wishlistStore";
import logo from "../../assets/icons/logo.svg";

const NAV_LINKS = [
  { label: "Home", to: "/", icon: <Home size={18} />, end: true },
  { label: "Shop", to: "/shop", icon: <ShoppingBag size={18} /> },
  { label: "Blog", to: "/blog", icon: <BookOpen size={18} /> },
  { label: "FAQ", to: "/faq", icon: <HelpCircle size={18} /> },
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
      setMobileMenuOpen(false);
    }
  }

  function close() {
    setMobileMenuOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* ── Верхняя строка (только десктоп) ── */}
        <div className="hidden border-b border-gray-100 lg:block">
          <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-9">
            <nav className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `text-sm transition-colors ${isActive ? "text-[#E44B26] font-semibold" : "text-gray-600 hover:text-[#E44B26]"}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <a
              href="tel:+1234567890"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#E44B26]"
            >
              <Phone size={13} /> +123 (456) 7890
            </a>
          </div>
        </div>

        {/* ── Основная строка ── */}
        <div className="max-w-[1200px] mx-auto px-4 flex items-center gap-3 h-14 lg:h-16">
          {/* Бургер (только мобайл) */}
          <button
            className="lg:hidden text-gray-600 hover:text-[#E44B26] p-1 transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Лого */}
          <Link
            to="/"
            className="flex items-center flex-shrink-0 gap-2"
            onClick={close}
          >
            <img src={logo} alt="Foodzy" className="" />
          </Link>

          {/* Поиск (скрыт на маленьких экранах) */}
          <form
            onSubmit={handleSearch}
            className="flex-1 hidden max-w-xl sm:flex"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for items..."
              className="flex-1 border border-gray-200 rounded-l-md px-4 py-2 text-sm
                         focus:outline-none focus:border-[#E44B26] transition-colors min-w-0"
            />
            <button
              type="submit"
              className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-4 rounded-r-md
                         transition-colors flex items-center flex-shrink-0"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Иконки */}
          <div className="flex items-center gap-2 ml-auto sm:gap-4">
            {/* Поиск иконка (только мобайл) */}
            <button
              className="sm:hidden text-gray-600 hover:text-[#E44B26] p-1"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Search size={20} />
            </button>

            <button className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E44B26] transition-colors">
              <User size={18} />
              <span className="hidden lg:inline">Account</span>
            </button>

            <Link
              to="/wishlist"
              className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E44B26] transition-colors"
            >
              <div className="relative">
                <Heart size={18} />
                {totalWishlistItems > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-[#E44B26] text-white text-[10px]
                                   w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  >
                    {totalWishlistItems > 9 ? "9+" : totalWishlistItems}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline">Wishlist</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E44B26] transition-colors"
              onClick={close}
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {totalCartItems > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-[#E44B26] text-white text-[10px]
                                   w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  >
                    {totalCartItems > 9 ? "9+" : totalCartItems}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline">Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Мобильное меню — fullscreen slide-down ── */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 lg:hidden bg-black/40 backdrop-blur-sm"
            onClick={close}
          />

          <div
            className="fixed left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-xl lg:hidden top-14"
            style={{ animation: "slideDown 0.2s ease-out" }}
          >
            {/* Поиск */}
            <div className="px-4 pt-4 pb-2">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for items..."
                  autoFocus
                  className="flex-1 border border-gray-200 rounded-l-lg px-4 py-2.5 text-sm
                             focus:outline-none focus:border-[#E44B26] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-4 rounded-r-lg
                             transition-colors flex items-center"
                >
                  <Search size={16} />
                </button>
              </form>
            </div>

            {/* Nav ссылки */}
            <nav className="px-2 pb-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={close}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700
                             hover:bg-orange-50 hover:text-[#E44B26] transition-colors font-medium no-underline"
                >
                  <span className="text-[#E44B26]">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Доп иконки */}
            <div className="flex flex-col gap-1 px-2 py-2 border-t border-gray-100">
              <button
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700
                                 hover:bg-orange-50 hover:text-[#E44B26] transition-colors font-medium w-full"
              >
                <User size={18} className="text-[#E44B26]" />
                Account
              </button>
              <Link
                to="/wishlist"
                onClick={close}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700
                           hover:bg-orange-50 hover:text-[#E44B26] transition-colors font-medium no-underline"
              >
                <Heart size={18} className="text-[#E44B26]" />
                Wishlist
                {totalWishlistItems > 0 && (
                  <span
                    className="ml-auto bg-[#E44B26] text-white text-[10px] w-5 h-5 rounded-full
                                   flex items-center justify-center font-bold"
                  >
                    {totalWishlistItems}
                  </span>
                )}
              </Link>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700
                           hover:bg-orange-50 hover:text-[#E44B26] transition-colors font-medium"
              >
                <Phone size={18} className="text-[#E44B26]" />
                +123 (456) 7890
              </a>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
