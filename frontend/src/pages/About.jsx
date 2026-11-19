import BackToPrevPage from "../components/BackToPrevPage";
import { ShieldCheck, Truck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about-page">
      <div className="back-to">
        <BackToPrevPage />
      </div>

      <section className="about-hero">
        <h1>Everyday goods, delivered.</h1>
        <p>E-millennial is a Ghana-based online store curating quality everyday products — from fashion and accessories to home essentials — with fast delivery and secure payments.</p>
        <img src="/About-page-banner.jpg" alt="Curated products on display" loading="lazy" />
      </section>

      <section className="about-story">
        <h2>Our story</h2>
        <p>We started E-millennial because we were tired of the same three options every time we wanted to buy something nice online. Either it was overpriced, late, or not what the photos showed.</p>
        <p>So we built a store around three things we actually care about: <strong>curated products we've chosen ourselves</strong>, <strong>transparent pricing in GHS</strong>, and <strong>payments you can trust</strong>. Every item on the shelf is something we'd buy ourselves.</p>
      </section>

      <section className="about-values">
        <h2>What we stand for</h2>
        <div className="values-grid">
          <div className="value-card">
            <ShieldCheck size={28} />
            <h3>Secure payments</h3>
            <p>Checkout is handled by Paystack — your card details never touch our servers.</p>
          </div>
          <div className="value-card">
            <Truck size={28} />
            <h3>Fast, tracked delivery</h3>
            <p>Orders are dispatched within 24 hours across Ghana.</p>
          </div>
          <div className="value-card">
            <Sparkles size={28} />
            <h3>Curated, not cluttered</h3>
            <p>We list a small, deliberate selection. Fewer things, chosen carefully.</p>
          </div>
        </div>
      </section>

      <section className="about-how">
        <h2>How it works</h2>
        <ol className="how-steps">
          <li><strong>Browse the shop</strong> — filter by category, search by name, sort by price.</li>
          <li><strong>Check out securely</strong> — pay with card, MoMo, or bank via Paystack.</li>
          <li><strong>Track your delivery</strong> — dispatched within 24 hours, delivered within 2–5 business days.</li>
        </ol>
      </section>

      <section className="about-cta">
        <h2>Ready to shop?</h2>
        <Link to="/shop" className="cta-button">Browse the shop</Link>
      </section>
    </div>
  );
}