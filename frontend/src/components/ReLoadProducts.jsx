import { RefreshCcw } from "lucide-react";

export default function ReLoadProducts({
  setRetryCount, setLoading
}) {
  return (
    <div>
      <span> 
        <button 
          type="button" 
          className="refresh-products" 
          onClick={()=>{
            setRetryCount((count)=>count + 1);
            setLoading(true)
          }}
        > 
          Try again <RefreshCcw size={17} className="refresh-products-icon" /> 
        </button>
        </span>
    </div>
  )
}
