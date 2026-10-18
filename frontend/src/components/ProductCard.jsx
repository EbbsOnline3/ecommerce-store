import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart}) {
  
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <button
          className="favorite-button"
          aria-label={`Save ${product.name} to favorites`}
          >
          <Heart size={18} color="var(--text-color)" />
        </button>
        <Link key={product.id} to={`/products/${product.id}`}>
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />

        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}


          </Link>
        <button
          className="quick-add"
          onClick={() => onAddToCart(product) }
        >
          <ShoppingBag size={16} />
          Add to bag
          <ArrowUpRight size={16} />
        </button>
      </div>

      <Link key={product.id} to={`/products/${product.id}`}>
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <div className="product-title-row">
            <h3>{product.name}</h3>
            <span className="product-price">
              GH₵{product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}