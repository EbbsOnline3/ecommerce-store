import { Link } from "react-router-dom";
import BackToPrevPage from "../components/BackToPrevPage";

export default function Profile() {
  return (
    <div className="profile-page">
      <div className="back-to"><BackToPrevPage /></div>
      <h1>Your profile</h1>
      <p>Account features coming soon.</p>
      <Link to={"/privacy"}><span>Privacy Policy</span></Link>
    </div>
  )
}
