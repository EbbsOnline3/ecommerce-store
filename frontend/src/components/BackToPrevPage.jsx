import { ArrowLeft } from "lucide-react";

export default function BackToPrevPage() {
  return (
    <button className="back-arrow" onClick={() => window.history.back()}>
      <ArrowLeft size={20} className="back-text-icon" />
      <span className="back-text">Back</span>
    </button>
  )
}
