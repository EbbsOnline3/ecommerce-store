import { useState } from "react";
import { ArrowRight, Check, X} from "lucide-react";
import ProductCard from "../components/ProductCard";
import ReLoadProducts from "../components/ReLoadProducts";
import LoadingIndicator from "../components/LoadingIndicator";

export default function Home({ 
  onAddToCart,
  errorNotice ,
  products,
  loading,
  setLoading,
  setRetryCount
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("")

  const categories = [
    "All",
    ...new Set(products && products.map((product) => product.category)),
  ];

  const search = searchTerm.toLowerCase().trim()
  const filteredProducts =products && products.filter((product) => {
    
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      (product.badge?.toLowerCase().includes(search)) ||
      product.price.toString().includes(search);

      return matchesCategory && matchesSearch;
  })


  

  
  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            THE NEW SEASON IS HERE
          </span>

          <h1>
            Find your
            <br />
            everyday <span>essential.</span>
          </h1>

          <p>
            Thoughtfully selected pieces for the way you
            live, work, and express yourself.
          </p>

          <a className="primary-button" href="#products">
            Explore the collection <ArrowRight size={18} />
          </a>

          <div className="hero-note">
            <Check size={16} />
            <span>Curated picks. Everyday value.</span>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
            alt="A thoughtfully arranged modern retail store"
          />

          <div className="image-caption">
            <span>THE EDIT — 001</span>
            <strong>Less, but better.</strong>
          </div>
        </div>
      </section>

      <section className="collection-section" id="products">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MADE FOR YOUR EVERYDAY</span>
            <h2>The collection<span>.</span></h2>
          </div>

          <p>Good things, chosen with care.</p>
        </div>

        <div className="category-filters" aria-label="Filter products">
          <div className="search-filter-div">
            <input type="search" value={searchTerm} onChange={(e)=>{
              setSearchTerm(e.target.value)
            }} name="search" id="search" placeholder="Search products by name, price, tag, or category..." />
            {searchTerm.trim() !=='' 
              && <button className="clear-search" onClick={()=>{setSearchTerm("")
                }} aria-label="Clear search input"> 
                  <X size={27}/>
                </button>
            }
          </div>
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {!loading ? filteredProducts.length > 0 ? filteredProducts.map((product) => (
            
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
          )): <p>{products.length === 0 ? <p>No products available right now.</p>: filteredProducts.length === 0 ? <p>No product matched your search</p>: null}</p> : <p className='loading-text'> <LoadingIndicator/> Loading...</p>} 
          {!loading ? errorNotice ? filteredProducts.length ===0 ?<ReLoadProducts setLoading={setLoading} setRetryCount={setRetryCount} />: null:null : null }
          
        </div>
      </section>

      <section className="newsletter" id="contact">
        <span className="eyebrow">STAY IN THE LOOP</span>
        <h2>Good finds, occasionally.</h2>
        <p>New arrivals and thoughtful picks, without the noise.</p>
        <a href="mailto:hello@example.com" className="newsletter-link">
          Get in touch <ArrowRight size={17} />
        </a>
      </section>

      <footer className="footer" id="about">
        <a className="brand" href="#home">
          millennial<span>.</span>
        </a>
        <p>Considered essentials for everyday life.</p>
        <span>© 2026 Millennial Store</span>
      </footer>
    </main>
  );
}