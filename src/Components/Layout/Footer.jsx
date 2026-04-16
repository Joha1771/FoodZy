import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, ChevronDown, ChevronUp } from "lucide-react";
import logo from "../../assets/icons/logo.svg";
import locationIcon from "../../assets/icons/footer-location-icon.svg";
import emailIcon from "../../assets/icons/footer-text-icon.svg";
import phoneIcon from "../../assets/icons/footer-phone-icon.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import xIcon from "../../assets/icons/x.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import footerImg1 from "../../assets/icons/footer-image1.svg";
import footerImg2 from "../../assets/icons/footer-image2.svg";
import footerImg3 from "../../assets/icons/footer-image3.svg";
import footerImg4 from "../../assets/icons/footer-image4.svg";
import footerImg5 from "../../assets/icons/footer-image5.svg";

const COMPANY_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Delivery Information", to: "/faq" },
  { label: "Privacy Policy", to: "/faq" },
  { label: "Terms & Conditions", to: "/faq" },
  { label: "Contact Us", to: "/faq" },
  { label: "Support Center", to: "/faq" },
];

const CATEGORY_LINKS = [
  { label: "Dairy & Bakery", to: "/shop?category=dairy-bakery" },
  { label: "Fruits & Vegetable", to: "/shop?category=fruits-vegetables" },
  { label: "Snack & Spice", to: "/shop?category=snack-spice" },
  { label: "Juice & Drinks", to: "/shop?category=juice-drinks" },
  { label: "Chicken & Meat", to: "/shop?category=chicken-meat" },
  { label: "Fast Food", to: "/shop?category=fast-food" },
];

const GALLERY_IMGS = [
  footerImg1,
  footerImg2,
  footerImg3,
  footerImg4,
  footerImg5,
];

// Аккордеон для мобайла
function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-3 text-left bg-transparent border-none cursor-pointer"
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        {open ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-12 bg-white border-t border-gray-100 sm:mt-16">
      {/* ── Мобайл: аккордеон ── */}
      <div className="px-4 pt-6 pb-2 md:hidden">
        {/* Бренд */}
        <div className="mb-5">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <img src={logo} alt="Foodzy" className="w-8 h-8" />
            <div className="leading-tight">
              <span className="block font-bold text-gray-900">Foodzy</span>
              <span className="block text-[10px] text-gray-400">
                A Treasure of Tastes
              </span>
            </div>
          </Link>
          <p className="mb-3 text-sm leading-relaxed text-gray-500">
            FoodTrove is the biggest market of grocery products.
          </p>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2 text-xs text-gray-500">
              <img
                src={locationIcon}
                alt=""
                className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
              />
              51 Green St. Huntington ohio beach ontario, NY 11746, USA.
            </li>
            <li className="flex items-center gap-2 text-xs text-gray-500">
              <img
                src={emailIcon}
                alt=""
                className="w-3.5 h-3.5 flex-shrink-0"
              />
              example@email.com
            </li>
            <li className="flex items-center gap-2 text-xs text-gray-500">
              <img
                src={phoneIcon}
                alt=""
                className="w-3.5 h-3.5 flex-shrink-0"
              />
              +91 123 4567890
            </li>
          </ul>
        </div>

        {/* Company accordion */}
        <Accordion title="Company">
          <ul className="space-y-2">
            {COMPANY_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm text-gray-500 hover:text-[#E44B26] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Accordion>

        {/* Category accordion */}
        <Accordion title="Category">
          <ul className="space-y-2">
            {CATEGORY_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm text-gray-500 hover:text-[#E44B26] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Accordion>

        {/* Newsletter */}
        <div className="py-4">
          <p className="mb-3 text-sm font-semibold text-gray-900">
            Subscribe Our Newsletter
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            className="flex mb-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 border border-gray-200 rounded-l-md px-3 py-2 text-sm
                         focus:outline-none focus:border-[#E44B26] transition-colors"
            />
            <button
              type="submit"
              className="bg-gray-900 hover:bg-[#E44B26] text-white px-3 rounded-r-md transition-colors"
            >
              <Send size={14} />
            </button>
          </form>
          <div className="flex items-center gap-3 mb-4">
            {[
              { src: facebookIcon, label: "Facebook" },
              { src: xIcon, label: "X" },
              { src: instagramIcon, label: "Instagram" },
            ].map(({ src, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="transition-opacity hover:opacity-70"
              >
                <img src={src} alt={label} className="w-5 h-5" />
              </a>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1">
            {GALLERY_IMGS.map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded aspect-square bg-gray-50"
              >
                <img src={img} alt="" className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Десктоп: обычная сетка ── */}
      <div className="hidden md:grid max-w-[1200px] mx-auto px-4 py-12 grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Foodzy" className="" />
          </Link>
          <p className="mb-4 text-sm leading-relaxed text-gray-500">
            FoodTrove is the biggest market of grocery products. Get your daily
            needs from our store.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-500">
              <img
                src={locationIcon}
                alt=""
                className="w-4 h-4 mt-0.5 flex-shrink-0"
              />
              51 Green St. Huntington ohio beach ontario, NY 11746 KY 4783, USA.
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-500">
              <img src={emailIcon} alt="" className="flex-shrink-0 w-4 h-4" />
              example@email.com
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-500">
              <img src={phoneIcon} alt="" className="flex-shrink-0 w-4 h-4" />
              +91 123 4567890
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-gray-900">Company</h4>
          <ul className="space-y-2">
            {COMPANY_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm text-gray-500 hover:text-[#E44B26] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-gray-900">Category</h4>
          <ul className="space-y-2">
            {CATEGORY_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm text-gray-500 hover:text-[#E44B26] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-gray-900">
            Subscribe Our Newsletter
          </h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex mb-4"
          >
            <input
              type="email"
              placeholder="Search here..."
              className="flex-1 border border-gray-200 rounded-l-md px-3 py-2 text-sm
                         focus:outline-none focus:border-[#E44B26] transition-colors"
            />
            <button className="bg-gray-900 hover:bg-[#E44B26] text-white px-3 rounded-r-md transition-colors">
              <Send size={15} />
            </button>
          </form>
          <div className="flex items-center gap-3 mb-4">
            {[
              { src: facebookIcon, label: "Facebook" },
              { src: xIcon, label: "X" },
              { src: instagramIcon, label: "Instagram" },
            ].map(({ src, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="transition-opacity hover:opacity-70"
              >
                <img src={src} alt={label} className="w-5 h-5" />
              </a>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1">
            {GALLERY_IMGS.map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded aspect-square bg-gray-50"
              >
                <img
                  src={img}
                  alt=""
                  className="object-cover w-full h-full transition-transform hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 py-4 text-center text-sm text-gray-400">
          © 2025{" "}
          <Link to="/" className="text-[#E44B26] hover:underline">
            Foodzy
          </Link>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
