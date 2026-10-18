import { Minus, Plus } from 'lucide-react';

export default function QuantityModifier({productQuantity, setProductQuantity, setNotice}) {
  const quantityPlus = ()=>{
    setProductQuantity(
     productQuantity <3000 ? parseInt(productQuantity) + 1 : productQuantity
    )
    productQuantity >= 3000 ? setNotice("Quantity can't be increased"): setNotice("")
    productQuantity < 1 ? setProductQuantity(1) : productQuantity
  }
  const quantityMinus = ()=>{
    setProductQuantity(
      productQuantity >1 ? parseInt(productQuantity) - 1 : productQuantity
    )
    productQuantity > 3000 ? setProductQuantity(3000) : productQuantity
    productQuantity <2 ? setNotice("Quantity can't be lowered"): setNotice("")
  }
  return (
    <div className="product-detail-quantity-div">
      <button 
        type="button" 
        onClick={quantityPlus}
        className={productQuantity >= 3000 ? "product-detail-quantity-plus-disabled" : "product-detail-quantity-plus"}
      >
        <Plus size={20}/>
      </button>
      <input 
        type="number" 
        name="product-quantity" 
        id="product-detail-quantity-input" 
        min={1} max={3000} 
        value={parseInt(productQuantity)}
        onChange={(e) => setProductQuantity(parseInt(e.target.value > 3000 ? 3000 : e.target.value < 1 ? 1 : e.target.value))}
      />
      <button 
        type="button" 
        onClick={quantityMinus}
        className={productQuantity <= 1 ? "product-detail-quantity-minus-disabled" : "product-detail-quantity-minus"}
      >
        <Minus size={20} />
      </button>
    </div>
  )
}
