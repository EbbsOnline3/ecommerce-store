import { ShoppingBag, Search, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ cartCount }) {
  const navigate = useNavigate()
  return (
    <header className="navbar">
      <a className="brand" href="/">
       E-millennial<span>.</span>
      </a>

      <nav className="nav-links">
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>Shop</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
      </nav>

      <div className="nav-actions">
        <button className="icon-button" aria-label="Search">
          <Search size={20} />
        </button>

        <button 
          className="icon-button cart-button" 
          aria-label="Shopping cart"
          onClick={()=>navigate("/shop/cart")}
        >
          <ShoppingBag size={20} />
          <span className="cart-count" title={cartCount + " items in cart"}>
            {cartCount > 999 ? "999+" : cartCount}
          </span>
        </button>

        <button className="icon-button mobile-menu" aria-label="Open menu">
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
}