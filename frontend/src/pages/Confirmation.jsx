import Button from "../components/Button";

export default function Confirmation({middle}) {
  return (
    <div className="confirmation-div">
      <p>Do you want to {middle} this?</p>
      <div>
        <Button text={"Yes"}/>
        <Button text={"No"} styles={{"BackgroundColor":"var(--accent)"}}/>
      </div>
    </div>
  )
}
