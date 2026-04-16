import { Link } from "react-router-dom";
import useCartStore from "../../Store/cartStore";
import useWishlistStore from "../../Store/wishlistStore";
import StarRating from "./StarRating";

const BADGE_TYPES = [
  {
    key: "is_new",
    label: "New",
    style: { background: "#2db224", color: "#fff" },
  },
  {
    key: "is_sale",
    label: "Sale",
    style: { background: "#3bc9db", color: "#fff" },
  },
  {
    key: "is_featured",
    label: "Hot",
    style: { background: "#f13a2f", color: "#fff" },
  },
];

function ProductBadge({ product }) {
  // Скидка в %
  if (product.old_price && product.price) {
    const pct = Math.round(
      ((product.old_price - product.price) / product.old_price) * 100,
    );
    if (pct > 0)
      return (
        <span
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 2,
            padding: "3px 8px",
            borderRadius: "4px",
            fontSize: "0.7rem",
            fontWeight: 700,
            background: "#f59f00",
            color: "#fff",
          }}
        >
          -{pct}%
        </span>
      );
  }
  for (const { key, label, style } of BADGE_TYPES) {
    if (product[key])
      return (
        <span
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 2,
            padding: "3px 8px",
            borderRadius: "4px",
            fontSize: "0.7rem",
            fontWeight: 700,
            ...style,
          }}
        >
          {label}
        </span>
      );
  }
  return null;
}

export default function ProductCard({ product, variant = "default" }) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  if (!product) return null;

  const {
    id,
    name,
    price,
    old_price,
    image_url,
    rating,
    review_count,
    categories,
    brand,
  } = product;
  const inWishlist = isInWishlist(id);
  const categoryName = categories?.name ?? "";

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  }

  function handleToggleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  }

  // ── Компактный вид ──
  if (variant === "compact") {
    return (
      <Link
        to={`/product/${id}`}
        className="flex items-center gap-3 no-underline group"
      >
        <div
          style={{
            width: 56,
            height: 56,
            flexShrink: 0,
            borderRadius: 8,
            overflow: "hidden",
            background: "#f8f8f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={image_url}
            alt={name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
            className="transition-transform group-hover:scale-105"
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#1a1a1a",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.4,
              marginBottom: 3,
            }}
            className="group-hover:text-[#E44B26] transition-colors"
          >
            {name}
          </p>
          <StarRating rating={rating} count={review_count} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 2,
            }}
          >
            <span
              style={{
                color: "#E44B26",
                fontWeight: 700,
                fontSize: "0.875rem",
              }}
            >
              ${price}
            </span>
            {old_price && (
              <span
                style={{
                  color: "#b0b0b0",
                  fontSize: "0.75rem",
                  textDecoration: "line-through",
                }}
              >
                ${old_price}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // ── Стандартный вид — точный стиль Foodzy ──
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e8e8e8",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "box-shadow 0.25s, transform 0.2s",
        position: "relative",
      }}
      className="group hover:shadow-xl hover:-translate-y-1"
    >
      <ProductBadge product={product} />

      {/* Wishlist кнопка */}
      <button
        onClick={handleToggleWishlist}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 2,
          background: inWishlist ? "#E44B26" : "rgba(255,255,255,0.9)",
          border: "1px solid #e8e8e8",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={inWishlist ? "#fff" : "none"}
          stroke={inWishlist ? "#fff" : "#E44B26"}
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Изображение */}
      <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
        <div
          style={{
            height: "190px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8f8f8",
            overflow: "hidden",
          }}
        >
          <img
            src={image_url || "/src/assets/images/hero-main.png"}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s",
            }}
            className="group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Инфо */}
      <div style={{ padding: "0.875rem 1rem 1rem" }}>
        {categoryName && (
          <p
            style={{
              fontSize: "0.72rem",
              color: "#7a7a7a",
              textTransform: "capitalize",
              marginBottom: "4px",
            }}
          >
            {categoryName}
          </p>
        )}

        <Link
          to={`/product/${id}`}
          style={{
            display: "block",
            marginBottom: "6px",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#1a1a1a",
            textDecoration: "none",
            lineHeight: 1.4,
          }}
          className="group-hover:text-[#E44B26] transition-colors"
        >
          {name}
        </Link>

        <StarRating rating={rating} count={review_count} />

        <p
          style={{
            fontSize: "0.75rem",
            color: "#7a7a7a",
            marginTop: "4px",
            marginBottom: "8px",
          }}
        >
          By{" "}
          <span style={{ color: "#2db224", fontWeight: 600 }}>
            {brand ?? "NestFood"}
          </span>
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{ color: "#E44B26", fontWeight: 700, fontSize: "1rem" }}
            >
              ${price}
            </span>
            {old_price && (
              <span
                style={{
                  color: "#b0b0b0",
                  textDecoration: "line-through",
                  fontSize: "0.85rem",
                }}
              >
                ${old_price}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            style={{
              padding: "0.35rem 0.85rem",
              fontSize: "0.78rem",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              borderRadius: "4px",
              background: "#E44B26",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              transition: "background-color 0.2s",
            }}
            className="hover:bg-[#c93f1e]"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
