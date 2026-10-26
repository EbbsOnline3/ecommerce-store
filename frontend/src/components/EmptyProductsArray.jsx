import ReLoadProducts from "./ReLoadProducts";

export default function EmptyProductsArray({text, styles, setLoading, setRetryCount, showTryAgain=true}) {
  return (
    <div className={"empty-products-array"} style={styles} >
      <p> {text} </p>
      {showTryAgain ? <ReLoadProducts  setLoading={setLoading} setRetryCount={setRetryCount}/> : null}
    </div>
  )
}
