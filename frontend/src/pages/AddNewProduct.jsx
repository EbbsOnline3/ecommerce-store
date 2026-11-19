import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackToPrevPage from "../components/BackToPrevPage";

export default function AddNewProduct({setNotice, setErrorNotice}) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [tag, setTag] = useState("")
  const [description, setDescription] = useState("")
  const [colours, setColours] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [quantity, setQuantity] = useState("")
  const fileInputRef = useRef()
  const navigate = useNavigate()


  async function handleSubmit(e){
    try{
      e.preventDefault()
      const fd = new FormData();
      fd.append("name", name);
      fd.append("category", category);
      fd.append("tag", tag);
      fd.append("description", description);
      fd.append("colours", colours);
      fd.append("price", price);
      fd.append("quantity", quantity);
      fd.append("image", fileInputRef.current.files[0]);   // the File object
      const res = await fetch("/api/products", {
        method: "POST",
        
        body: fd
      })

      const data = await res.json()
      if (res.status === 201){
        setNotice(data.success || "Successfully added products")
        navigate("/shop")
      }
      else{
        setErrorNotice(data.error || "Can't reach server")
      }

    }catch(error){
      setErrorNotice("Nothing worked", error)
    }
  }


  return (
    <div className="add-new-product-div">
      <div className="back-to">
        <BackToPrevPage />
      </div>
      <h1>Add Product</h1>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className="form-div">
          <label htmlFor="product-name"> Name
            <input type="text" name="product-name" id="product-name" placeholder="Pair of Grey Boots" required 
            value={name}
            onChange={(e)=> {setName(e.target.value)}}
            />
          </label>
          <div className="cat-tag">
            <label htmlFor="product-category"> Category
              <input type="text" name="product-category" id="product-category" placeholder="Pair of Grey Boots" required
            value={category}
            onChange={(e)=> {setCategory(e.target.value)}}
            />
            </label>
            <label htmlFor="product-tag"> Tag
              <input type="text" name="product-tag" id="product-tag" placeholder="New or Old or Popular..." required
            value={tag}
            onChange={(e)=> {setTag(e.target.value)}}
            />
            </label>
            <label htmlFor="product-price"> Price
              <input type="number" name="product-price" id="product-price" min={1} max={1000000} placeholder="200" required
            value={price}
            onChange={(e)=> {setPrice(e.target.value)}}
            />
            </label>
          </div>
          <div className="cat-tag">
            <label htmlFor="product-colours"> Colours
              <input type="text" name="product-colours" id="product-colours" placeholder="red, blue,..." required
            value={colours}
            onChange={(e)=> {setColours(e.target.value)}}
            />
            </label>
            <label htmlFor="product-quantity"> Quantity
              <input type="text" name="product-quantity" id="product-quantity" placeholder="1000..."
            value={quantity}
            onChange={(e)=> {setQuantity(e.target.value)}}
            />
            </label>

          </div>
          <label htmlFor="product-image"> Image
            <input type="file" ref={fileInputRef} name="product-image" id="product-image" accept="image/*" required
            value={image}
            onChange={(e)=> {setImage(e.target.value)}}
            />
          </label>
          <label htmlFor="product-description"> Description
            <textarea type="text" name="product-description" id="product-description" placeholder="An adidas rare edition boot..." required
            value={description}
            onChange={(e)=> {setDescription(e.target.value)}}
            ></textarea>
          </label>
          <button type="submit">Add </button>
        </div>

      </form>
    </div>
  )
}
