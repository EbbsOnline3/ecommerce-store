import { useState } from "react";
import { CheckCircle2, X, XCircleIcon } from "lucide-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
// import Shop from "./pages/Shop";

export default function App() {
  const [cart, setCart] = useState([]);
  const [notice, setNotice] = useState("");
  const [errorNotice, setErrorNotice] = useState("");
  // const [searchTerm, setSearchTerm] = useState("")
  // const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [retryCount, setRetryCount] = useState(0);

  function addToCart(product, productQuantity=1) {
    if(productQuantity < 1 || !Number.isInteger(productQuantity)){
      return
    }
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + productQuantity }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: productQuantity }];
    });

    setNotice(`${productQuantity} ${product.name} added to your bag.`);
  }
  
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((c) => c.id !== id)
    );
  };

  const updateQuantity = (id, newQuantity)=> {
    if(!Number.isInteger(newQuantity) || newQuantity <= 1 || newQuantity ===''){
      return
    }
    setCart(currentCart => {
      return currentCart.map((cur) => {
        return cur.id === id ? {...cur, quantity: newQuantity} : cur
      })
    })
  }

  return (
    <Router>
      <Navbar
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        cart={cart}
      />

      {notice && (
        <div className="toast" role="status">
          <CheckCircle2 size={19} />
          <span>{notice}</span>
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={17} />
          </button>
        </div>
      )}
      {errorNotice && (
        <div className="toast" role="status">
          <XCircleIcon size={19} color="red" />
          <span>{errorNotice}</span>
          <button
            onClick={() => setErrorNotice("")}
            aria-label="Dismiss error notification"
          >
            <X size={17} />
          </button>
        </div>
      )}

      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              onAddToCart={addToCart} 
              notice={notice} 
              setNotice={setNotice} 
              setErrorNotice={setErrorNotice}
              errorNotice={errorNotice}
              // setSearchTerm={setSearchTerm}
              // searchTerm={searchTerm}
              // activeCategory={activeCategory}
              // setActiveCategory={setActiveCategory}
              products={products}
              setProducts={setProducts}
              setLoading={setLoading}
              setRetryCount={setRetryCount}
              loading={loading}
              retryCount={retryCount}
            />} 
        />
        <Route 
          path="/products/:id" 
          element={
            <ProductDetail 
              setNotice={setNotice} 
              addToCart={addToCart}
              products={products}
              setProducts={setProducts} 
              setLoading={setLoading}
              setRetryCount={setRetryCount}
              retryCount={retryCount}
              setErrorNotice={setErrorNotice}
              loading={loading}
              errorNotice={errorNotice}
          />} 
        />
        {/* <Route 
          path="/products" 
          element={
            <Shop 
              setNotice={setNotice} 
              addToCart={addToCart}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              products={products}
              setProducts={setProducts}
          />} 
        /> */}
        <Route path="/shop/cart" 
          element={
            <Cart 
              cart={cart} 
              setErrorNotice={setErrorNotice} 
              removeFromCart ={removeFromCart}
              updateQuantity={updateQuantity}
          />} />
      </Routes>
    </Router>
  );
}