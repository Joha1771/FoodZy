import { useState } from "react";
import newsletterImg from "../../assets/images/NewsLetterBanner-img.png";

/**
 * Баннер подписки на рассылку.
 * Зелёный фон, иллюстрация курьера, форма email.
 */
export default function NewsletterBanner() {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: POST на Supabase или email-сервис
    setEmail("");
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-6">
      <div
        className="bg-[#EDF6EE] rounded-2xl px-8 py-10 flex flex-col
                     gap-6 relative overflow-hidden"
      >
        {/* Декоративный паттерн */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, #3BB77E 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Текст */}
        <div className="relative z-10 text-center md:text-left">
          <h2 className="mb-2 text-2xl font-black leading-tight text-gray-900 md:text-3xl">
            Stay home &amp; get your daily
            <br />
            needs from our shop
          </h2>
          <p className="text-sm text-gray-500">
            Start Your Daily Shopping with{" "}
            <span className="text-[#E44B26] font-medium">Nest Mart</span>
          </p>
        </div>

        {/* Форма */}
        <form
          onSubmit={handleSubmit}
          className="flex relative z-10 w-full md:max-w-[473px]"
        >
          <div className="flex items-center flex-1 gap-2 px-4 bg-white border border-gray-200 rounded-l-full md:w-64">
            <svg
              width="16"
              height="16"
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
              required
              className="flex-1 py-3 text-sm text-gray-700 bg-transparent focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#E44B26] hover:bg-[#c93f1e] text-white px-6 py-3
                       rounded-r-full text-sm font-medium transition-colors flex-shrink-0"
          >
            Subscribe
          </button>
        </form>

        {/* Картинка курьера */}
        <img
          src={newsletterImg}
          alt="Delivery"
          className="absolute bottom-0 hidden pointer-events-none xl:block right-10 h-60"
        />
      </div>
    </section>
  );
}
