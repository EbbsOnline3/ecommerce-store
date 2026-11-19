import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Plus, X } from "lucide-react";
import LoadingState from "../components/LoadingState";
import EmptyProductsArray from "../components/EmptyProductsArray";
import { Link } from "react-router-dom";

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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  
  
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

  const totalPages = Math.max(
    1,
    Math.ceil((sortedProducts?.length ?? 0) / itemsPerPage)
  );
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = sortedProducts.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  function renderProductArea() {
    if (loading) {
      return <LoadingState text={"Loading..."} />;
    }
    
    if (errorNotice) {
      return <EmptyProductsArray text={"Failed to load products"} setRetryCount={setRetryCount} setLoading={setLoading} />;
    }
    
    if (products && products.length === 0) {
      return <EmptyProductsArray text={"No products available"} setRetryCount={setRetryCount} setLoading={setLoading} />;
    }
    
    if (paginatedProducts.length === 0) {
      return <EmptyProductsArray styles={{display: "flex", width: "100%"}} text={"No matching products"} showTryAgain={false} />;
    }
    
    return paginatedProducts.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        onAddToCart={addToCart}
      />
    ));
  }

  useEffect(() => { window.scrollTo({ top: 0 }) }, [safePage])
  
  return (
    <div className="shop">
      <div className="category-filters" aria-label="Filter products">
        <div className="search-filter-div">
          <input type="search" value={searchTerm} onChange={(e)=>{
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }} name="search" id="search" placeholder="Search products by name, price, tag, or category..." aria-label="search products"/>
          {searchTerm.trim() !=='' 
            && <button className="clear-search" onClick={()=>{setSearchTerm("")
              setCurrentPage(1)
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
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
            >
              {category}
            </button>
          ))}
          <select name="sort" id="sort" aria-label="Sort products" onChange={(e)=>{
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}>
            {sortOptions.map(op => 
              <option key={op.value} value={op.value}> {op.label} </option>
            )}
          </select>
        </div>
      </div>
      <div className={!errorNotice  ? "product-grid shop": "product-flex"}>
        {renderProductArea() }
      </div>
      <Link to="/shop/add" className="add-product" title="add-product" aria-label="add">
        <Plus size={25} />
      </Link>
      {totalPages > 1 && <div className="pages-div">
        <div className="current-page">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
          <button
            key={n}
            className={n === safePage ? "active" : ""}
            onClick={() => setCurrentPage(n)}
            aria-label={`Page ${n}`}
            aria-current={n === safePage ? "page" : undefined}
          >
            {n}
          </button>
          ))}
          
        </div>
      </div>}
    </div>
  )
}


