import { useParams } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import LoadingState from "../components/LoadingState";
import EmptyProductsArray from "../components/EmptyProductsArray";
import QuantityModifier from "../components/QuantityModifier";
import BackToPrevPage from "../components/BackToPrevPage";

export default function ProductDetail({
  addToCart, 
  setNotice,
  setRetryCount,
  setLoading,
  retryCount,
  setErrorNotice, 
  loading,
  errorNotice
}) {
  const { id } = useParams();
  const [product, setProduct] = useState()
  // const product = products.find((p) => p.id === parseInt(id));
  const [productQuantity, setProductQuantity] = useState(1)


  useEffect(() => {
    setErrorNotice("")
    setLoading(true)
    const controller = new AbortController()
    const fetchedProducts = async () => {
      setProduct(null)
      try{
        const response = await fetch(`http://127.0.0.1:5000/api/products/${id}`, { signal: controller.signal })
        if (response.ok){
          const data = await response.json()
          setProduct(data)
        }
        else if(response.status === 404){
          setErrorNotice("Product not found")
        }
        else if(response.status === 500){
          setErrorNotice("Server error")
        }
        else{
          throw new Error("Product can't be found")
        }}
        catch(e){
          if (e.name === "AbortError"){
            return
          }
          setErrorNotice("Failed to load product information")
          console.log("Error: ", e.message)
        }
        finally{
          if (!controller.signal.aborted){
            setLoading(false)
          }
        }
    }
    fetchedProducts()
    return () => {
      controller.abort();
    };
  }, [setProduct, id, retryCount, setErrorNotice, setLoading])

  return (
    <div className="product-detail-page">
      <div className="product-detail-header">
        <BackToPrevPage />
      </div>
      {!loading ? errorNotice ? <EmptyProductsArray setLoading={setLoading} setRetryCount={setRetryCount} text= {errorNotice} /> : product ? (
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} loading="lazy" />
            <div>
              
            </div>
          </div>
          <div className="product-detail-info">
            <div className="product-detail-text">
              <div className="product-detail-desc">
                <h2>{product.name}</h2>
                <p className="product-detail-price">GH₵ {(product.price).toFixed(2)}</p>
                <p className="product-detail-prev-price">GH₵ {(product.price * 0.9).toFixed(2)}</p>
                <h3><span><Star size={23}/></span> <span><Star size={23}/></span> <span><Star size={23}/></span> <span><Star size={23}/></span> <span><Star size={23}/></span></h3>
              </div>
              <div className="product-detail-meta">
                <p>{product.description}</p>
                {product.badge && <p className="product-detail-badge">{product.badge}</p>}
                <p className="product-detail-category">{product.category}</p>
                <p className="product-detail-price">Total: GH₵ {(product.price * productQuantity).toFixed(2)}</p>
              </div>
            </div>
            <div className="product-detail-actions">
              <QuantityModifier setNotice={setNotice} setProductQuantity={setProductQuantity} productQuantity={productQuantity} />
              <div className="product-details-actions-btn">
                <button 
                  className="add-to-cart-button" 
                  onClick={() => {
                    addToCart(product, productQuantity); 
                    setProductQuantity(1);
                  }}
                >
                  Add to Cart
                </button>
                <button className="add-to-wishlist-button" title="Add to Wishlist">
                  <Heart size={27} />
                </button>
              </div>
              <div className="features">
                <h3>Features</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, temporibus aspernatur in suscipit maxime dignissimos magnam recusandae rerum? Sint suscipit excepturi error nobis delectus incidunt reprehenderit quibusdam corrupti eum provident.</p>
              </div>
              <div className="features">
                <h3>Features</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, temporibus aspernatur in suscipit maxime dignissimos magnam recusandae rerum? Sint suscipit excepturi error nobis delectus incidunt reprehenderit quibusdam corrupti eum provident.</p>
              </div>
              <div className="features">
                <h3>Features</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, temporibus aspernatur in suscipit maxime dignissimos magnam recusandae rerum? Sint suscipit excepturi error nobis delectus incidunt reprehenderit quibusdam corrupti eum provident.</p>
              </div>
              <div className="features">
                <h3>Features</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, temporibus aspernatur in suscipit maxime dignissimos magnam recusandae rerum? Sint suscipit excepturi error nobis delectus incidunt reprehenderit quibusdam corrupti eum provident.</p>
              </div>
            </div>
          </div>
          </div>

      ): <EmptyProductsArray text= {"Not found."} showTryAgain={false}/> : <LoadingState text={"Loading..."} /> }

      {/* {
        products.filter(product => product.id !== id ? 
          products.map(p=>{
            <Link to={"/products/${p.id"}>{p.name}</Link>
          } ) 
          : <p>None</p>)
      } */}

    </div>
  )
}
