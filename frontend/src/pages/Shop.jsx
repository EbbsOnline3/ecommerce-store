import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { X } from "lucide-react";
import LoadingIndicator from "../components/LoadingIndicator";
import ReLoadProducts from "../components/ReLoadProducts";

export default function Shop({
  setLoading, 
  addToCart, 
  products, 
  loading,
  errorNotice,
  setRetryCount
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("")
  const categories = [
    "All",
    ...new Set(products && products.map((product) => product.category)),
  ];

  const search = searchTerm.toLowerCase().trim()
  const filteredProducts = products && products.filter((product) => {
    
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      (product.badge?.toLowerCase().includes(search)) ||
      product.price.toString().includes(search);

      return matchesCategory && matchesSearch;
  })

  
  return (
    <div className="shop">
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
                onAddToCart={addToCart}
              />
          )): <p>{products.length === 0 ? <p>No products available right now.</p>: filteredProducts.length === 0 ? <p>No product matched your search</p>: null}</p> : <p className='loading-text'> <LoadingIndicator/> Loading...</p>} 
          {!loading ? errorNotice ? filteredProducts.length ===0 ?<ReLoadProducts setLoading={setLoading} setRetryCount={setRetryCount} />: null:null : null }
        </div>
    </div>
  )
}


