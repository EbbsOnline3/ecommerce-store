import { useState } from "react";
import BackToPrevPage from "../components/BackToPrevPage";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact({ setNotice, setErrorNotice }) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Failed to send");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setNotice("Message sent — we'll reply within 24 hours");
      } catch (err) {
        setErrorNotice(err.message);
      } finally {
        setSubmitting(false);
      }
  };

  return (
    <div className="contact-page">
      <div className="back-to">
        <BackToPrevPage />
      </div>

      <h1>Get in touch</h1>
      <p>Questions about an order, a product, or just want to say hi? We reply within 24 hours.</p>

      <div className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Your name
            <input name="name" value={formData.name} onChange={handleChange} required maxLength={100} aria-label="Your name" />
          </label>
          <label>Email
            <input name="email" type="email" value={formData.email} onChange={handleChange} required aria-label="Your email" />
          </label>
          <label>Subject
            <input name="subject" value={formData.subject} onChange={handleChange} required maxLength={150} aria-label="Subject" />
          </label>
          <label>Message
            <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} maxLength={5000} aria-label="Message" />
          </label>
          <button type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send message"}</button>
        </form>

        <aside className="contact-details">
          <h2>Other ways to reach us</h2>
          <p><Mail size={18} /> <a href="mailto:support@e-millennial.com">support@e-millennial.com</a></p>
          <p><Phone size={18} /> <a href="tel:+23350548XXXX">+233 50 548 XXXX</a></p>
          <p><MapPin size={18} /> Accra, Ghana</p>
          <p className="contact-hours"><strong>Hours:</strong> Mon–Fri, 8am–4pm GMT</p>
        </aside>
      </div>
    </div>
  );
}