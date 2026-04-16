import { useState } from "react";
import { Link } from "react-router-dom";
import heroMain from "../../assets/images/hero-main.png";
import heroBg1 from "../../assets/icons/hero-bg1.svg";
import heroBg2 from "../../assets/icons/hero-bg2.svg";

const HERO_TAGS = ["Shopping", "Recipes", "Kitchen", "News", "Food"];

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [activeTag, setActiveTag] = useState("Shopping");

  function handleSubscribe(e) {
    e.preventDefault();
    setEmail("");
  }

  return (
    <section className="bg-[#F3F4F6] relative overflow-hidden">
      <div
        className="max-w-[1200px] mx-auto px-4 py-10 lg:py-16
                      grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-8
                      min-h-[auto] lg:min-h-[520px]"
      >
        {/* ── Левая часть ── */}
        <div className="relative z-10 order-2 lg:order-1">
          {/* Теги */}
          <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
            {HERO_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1 rounded-full text-xs lg:text-sm border transition-all
                  ${
                    activeTag === tag
                      ? "bg-white border-gray-300 text-gray-800 font-medium shadow-sm"
                      : "border-transparent text-gray-500 hover:border-gray-200"
                  }`}
              >
                {activeTag === tag && (
                  <span className="text-[#E44B26] mr-1">×</span>
                )}
                {tag}
              </button>
            ))}
          </div>

          <p className="text-[#E44B26] font-semibold text-xs lg:text-sm mb-2">
            100% <span className="text-gray-800">Organic Vegetables</span>
          </p>

          <h1 className="mb-3 text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl lg:mb-4">
            The best way to
            <br />
            stuff your wallet.
          </h1>

          <p className="max-w-sm mb-5 text-sm leading-relaxed text-gray-500 lg:mb-6">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Amet
            reiciendis beatae consequuntur.
          </p>

          {/* Форма подписки */}
          <form
            onSubmit={handleSubscribe}
            className="flex items-center w-full max-w-sm"
          >
            <div className="flex items-center flex-1 gap-2 px-3 bg-white border border-gray-200 rounded-l-full lg:px-4">
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 py-2.5 lg:py-3 text-sm bg-transparent focus:outline-none text-gray-700"
              />
            </div>
            <button
              type="submit"
              className="bg-[#3BB77E] hover:bg-[#2ea06c] text-white px-4 lg:px-6 py-2.5 lg:py-3
                         rounded-r-full text-xs lg:text-sm font-medium transition-colors flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* ── Правая часть: картинка ── */}
        <div className="relative flex items-center justify-center order-1 lg:order-2">
          <img
            src={heroBg1}
            alt=""
            className="absolute w-10 pointer-events-none top-2 left-2 lg:w-16 opacity-40"
          />
          <img
            src={heroBg2}
            alt=""
            className="absolute w-8 pointer-events-none bottom-2 right-2 lg:w-12 opacity-30"
          />
          <img
            src={heroMain}
            alt="Fresh vegetables"
            className="max-h-[200px] sm:max-h-[260px] lg:max-h-[380px] object-contain drop-shadow-xl relative z-10 w-full"
          />
        </div>
      </div>
    </section>
  );
}
