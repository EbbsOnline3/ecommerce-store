import LoadingIndicator from "./LoadingIndicator";

export default function LoadingState({text}) {
  return (
    <div className='loading-text'>
      <LoadingIndicator /> {text}
    </div>
  )
}
