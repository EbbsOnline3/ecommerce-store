import Paystack from '@paystack/inline-js'
import { Link, useNavigate } from "react-router-dom";
import EmptyProductsArray from "../components/EmptyProductsArray";
import { Minus, Plus, Trash } from "lucide-react";
import Button from "../components/Button";
import { useRef } from 'react';

export default function Cart({cart, setCart, setNotice, setErrorNotice, removeFromCart, updateQuantity}) {
  const navigate = useNavigate()
  const subtotal = cart.reduce((total, c) => (total + (c.price*c.quantity)), 0);
  const mailRef= useRef()
  const lastNameRef= useRef()
  const firstNameRef= useRef()
  
  function payWithPaystack(){
    if (mailRef.current.value === '' || firstNameRef.current.value === '' || lastNameRef.current.value === ''){
      setErrorNotice("Name or Email not filled")
      return
    }
    const popup = new Paystack()
    popup.checkout({
      key: "pk_test_14d8c14df0cdaf2140a0530b80200ac58e1b1605",
      email: mailRef.current.value,
      amount: Math.round(subtotal * 100), //Lowest amount 
      currency: "GHS",
      onSuccess: async (transaction) => {
          try {
            const payLoad = {
              first_name : firstNameRef.current.value,
              last_name: lastNameRef.current.value,
              order_total: subtotal,
              order_items: cart,
              transaction: transaction,
              email: mailRef.current.value
            }
            const res = await fetch("http://127.0.0.1:5000/api/orders",{
              method: 'POST', 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payLoad)
  
            })
            if(res.status === 201){
              setNotice("Transaction is successful!!!")
              navigate("/shop") //set url to shop
              setCart([]) //se cart back to an empty state            
            }else {
              setErrorNotice("Payment succeeded but order could not be saved. Please contact support.")
            }
          } catch (error) {
            setErrorNotice("Payment succeeded but order failed. Please contact support.")
            console.log(error.message)
          }
      },
      onCancel: () => {
        console.log("Payment modal closed")
      },
      onError: (error) =>{
        console.error("Error:", error.message)
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cart.length <1){
      return setErrorNotice("Cart is Empty")
    }
    payWithPaystack()
  }
  return (
    <div className="cart-page" id="cart-page-div">
      <div className="cart-items-div">
        <h1>Your Cart <span>({cart.length} {cart.length >1 ?<span>items</span>:<span>item</span>})</span></h1>
        {cart.length >= 1 ? cart.map((c) => {
          return (
            <div key={c.id} className="cart-items">
                <div className="cart-image">
                  <img src={c.image} alt={c.name} draggable={false} /> 
                </div>
                <div className="cart-details">
                  <div className="cart-top-content">
                    <h2>{c.name}</h2>
                    <button 
                      className="remove-from-cart"
                      onClick={()=> removeFromCart(c.id)}
                      title="delete item"
                      aria-label="delete item"
                    >
                      <Trash size={17} />
                    </button>
                  </div>
                  <span>GH₵ {c.price}</span>
                  <div className="additional-quantity">
                    Quantity: {c.quantity}
                    <div>
                      <span>
                        <Button 
                          text={<Plus />} 
                          onClick={()=>{updateQuantity(c.id, c.quantity + 1)}} 
                        />
                        <input 
                          type="number" 
                          min={1} name="add" 
                          id="add-quantity-cart-input"
                          onChange={(e) => updateQuantity(c.id, Number(e.target.value))}
                          value={c.quantity} 
                        />
                        <Button 
                          text={<Minus />} 
                          onClick={()=>{updateQuantity(c.id, c.quantity - 1)}}
                        />
                        
                      </span>
                    </div> 
                  </div>
                </div>
              
            </div>
          )
      }): <div className="cart-items-div1"> <EmptyProductsArray  text={'Cart is empty'} showTryAgain={false} /> <Link to="/shop/">Add Items</Link></div> }
      </div>
      <div className="checkout-details">
        {cart.length >=1 &&<form action="" onSubmit={(e)=>{handleSubmit(e)}}>
          <h2>CheckOut Details</h2>
          <div className="form-details">
            <div >
              <label htmlFor="first-name">First Name
                <input type="text" ref={firstNameRef} name="first-name" id="first-name" required/>
              </label>
              <label htmlFor="last-name">
                Last Name
                <input type="text" ref={lastNameRef} name="last-name" id="last-name" required/>
              </label>
            </div>
            <label htmlFor="email">
              Email
              <input autoComplete="true" ref={mailRef} type="email" name="email" id="email" required/>
            </label>
            <label htmlFor="address">
              Address
              <input type="text" name="address" id="address" required/>
            </label>
            <label htmlFor="contact">
              Phone Number
              <input type="number" name="contact" id="contact" required/>
            </label>
            <label htmlFor="coupon">
              Coupon/Volture
              <input type="text" name="coupon" id="coupon" />
            </label>
            <button type="submit">Checkout</button>
          </div>
        </form>}
        {cart.length >= 1 && <p className="subtotal">Subtotal:GH₵ {subtotal.toFixed(2)}</p>}
      </div>
    </div>
  )
}
