import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { Plus, X } from "lucide-react";
import LoadingState from "../components/LoadingState";
import EmptyProductsArray from "../components/EmptyProductsArray";

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
  const [sortOption, setSortOption] = useState("default");
  const categories = [
    "All",
    ...new Set(products && products.map((product) => product.category)),
  ];
  const sortOptions = [
    { value: "default", label: "Default product order" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A – Z" },
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

  // const sortedProducts = filteredProducts && [...filteredProducts].sort((a, b)=> 
  //   sortOption === "Default" && a - b || sortOption === "A - Z" && a.name.localeCompare(b.name) || sortOption === "L - H"&& a.price - b.price || sortOption === "H - L"&& b.price - a.price
  // )
  const sortedProducts = [...(filteredProducts ?? [])].sort((a, b) => {
    switch (sortOption) {
    case "price-asc":
      return a.price - b.price;

    case "price-desc":
      return b.price - a.price;

    case "name-asc":
      return a.name.localeCompare(b.name);

    default:
      return 0;
  }
});
  
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
          <select name="sort" id="sort" onChange={(e)=>setSortOption(e.target.value)}>
            {sortOptions.map(op => 
              <option key={op.value} value={op.value}> {op.label} </option>
            )}
          </select>
        </div>
      </div>
      <div className={!errorNotice  ? "product-grid shop": "product-flex"}>
        {!loading ? sortedProducts.length > 0 ? sortedProducts.map((product) => (
          
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
        )): errorNotice ? <EmptyProductsArray text={"Failed to load products"} setRetryCount={setRetryCount} setLoading={setLoading} /> : products && products.length===0 ? <EmptyProductsArray text={"No products available"} setRetryCount={setRetryCount} setLoading={setLoading} />: sortedProducts && sortedProducts.length === 0 ? <EmptyProductsArray styles={{display: "flex", width: "100%"}} text={"No matching products"} showTryAgain={false}  />: <EmptyProductsArray /> :<LoadingState text={"Loading..."} /> }
      </div>
      <button className="add-product" aria-label="add">
        <Plus size={25} xlinkTitle="add-product" />
      </button>
    </div>
  )
}


