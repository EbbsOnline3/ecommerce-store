import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { X } from "lucide-react";

export default function Shop({setLoading, addToCart,searchTerm, setSearchTerm, activeCategory, setActiveCategory, products, setProducts}) {

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const search = searchTerm.toLowerCase().trim()
  const filteredProducts =products.filter((product) => {
    
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      (product.badge?.toLowerCase().includes(search)) ||
      product.price.toString().includes(search);

      return matchesCategory && matchesSearch;
  })

  useEffect(()=>{
    const fetchedProducts = async () => { 
      try{
        const res = await fetch('http://127.0.0.1:5000/api/products')
        if (res.ok){
          const data = await res.json()
          setProducts(data)
          setLoading(true)
        } 
        else{
          throw("Error fetching ")
        }
      }
      catch(e){
        console.log(e)
      }
      finally{
        setLoading(false)
      }
    }
    return fetchedProducts
  },[setLoading, setProducts])
  return (
    <div>
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
          {filteredProducts.length > 0 ? filteredProducts.map((product) => (
            
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
          )): <p>No products found.</p>}
        </div>
    </div>
  )
}


