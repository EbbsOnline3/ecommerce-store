import ReLoadProducts from "./ReLoadProducts";

export default function EmptyProductsArray({text, setLoading, setRetryCount, showTryAgain=true}) {
  return (
    <div className={"empty-products-array"} >
      <p> {text} </p>
      {showTryAgain ? <ReLoadProducts  setLoading={setLoading} setRetryCount={setRetryCount}/> : null}
    </div>
  )
}
