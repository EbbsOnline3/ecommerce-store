import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ cartCount }) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleClick= () =>{
    setIsOpen(!isOpen)
  }
  const closeMenu= () =>{
    setIsOpen(false)
  }
  return (
    <header className="navbar">
      <Link className="brand" to="/">
       E-millennial<span>.</span>
      </Link>

      <nav className={!isOpen ? "nav-links" : "open"}>
        <NavLink onClick={closeMenu} to={"/"}>Home</NavLink>
        <NavLink onClick={closeMenu} to={"/shop"}>Shop</NavLink>
        <NavLink onClick={closeMenu} to={"/about"}>About</NavLink>
        <NavLink onClick={closeMenu} to={"/contact"}>Contact</NavLink>
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

        <button className="icon-button mobile-menu" aria-label={isOpen ? "Close Menu" : "Open menu"} onClick={handleClick}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}