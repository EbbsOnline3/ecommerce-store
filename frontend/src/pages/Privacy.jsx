// Ghana Data Protection Act (2012, Act 843) compliance should be verified.
// Every clause below is grounded in what the app actually does; if the app
// changes (e.g. user auth is added), I will update section 8 and the audit trail.

import BackToPrevPage from "../components/BackToPrevPage";

export default function Privacy() {
  return (
    <div className="privacy-page">
      <div className="back-to">
        <BackToPrevPage />
      </div>

      <article className="privacy-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">
          <em>Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</em>
        </p>

        <p>
          E-millennial ("we", "us", "our") operates this store. This page explains
          what information we collect when you use it, how we use that information,
          and the choices you have. We've tried to write it in plain English — if
          anything is unclear, email us.
        </p>

        <h2>1. Who we are</h2>
        <p>
          E-millennial is a Ghana-based online store. For any question about this
          policy or about your data, you can reach us at{" "}
          <a href="mailto:support@e-millennial.com">support@e-millennial.com</a>.
        </p>

        <h2>2. What we collect</h2>
        <p>
          We only collect what's necessary to run the store. In detail:
        </p>
        <ul>
          <li>
            <strong>Order information</strong> — when you check out, we collect
            your first name, last name, email address, delivery address, phone
            number, and the items in your order (including quantities and total).
            This is required to fulfil your order and to keep an accurate sales
            record.
          </li>
          <li>
            <strong>Payment information</strong> — payments are processed by
            Paystack. We never see or store your card number, CVV, or mobile-money
            PIN. Paystack receives your email address and the order amount; we
            receive a confirmation that a payment succeeded.
          </li>
          <li>
            <strong>Contact messages</strong> — if you use our{" "}
            <a href="/contact">contact form</a>, we store the name, email address,
            subject line, and message you submit, along with the time of
            submission.
          </li>
          <li>
            <strong>Cart contents</strong> — items in your shopping cart are stored
            in your browser's <code>localStorage</code>, on your device. They are
            not sent to our servers until you check out. Clearing your browser
            storage will empty your cart.
          </li>
          <li>
            <strong>Product uploads</strong> — if you are authorised to add
            products to the store (admin role), uploaded images are stored on our
            server. These are not tied to any personal information about end users.
          </li>
        </ul>

        <h2>3. What we don't collect</h2>
        <p>
          To be explicit about what we <em>don't</em> do:
        </p>
        <ul>
          <li>We do not use third-party analytics (no Google Analytics, no Meta Pixel, no Plausible, etc.).</li>
          <li>We do not use tracking cookies. We use <code>localStorage</code> for your cart — that's it.</li>
          <li>We do not sell, rent, or share your personal data with advertisers.</li>
          <li>We do not log your IP address beyond what our web server writes to access logs for operational purposes.</li>
        </ul>

        <h2>4. How we use your information</h2>
        <ul>
          <li>To process, deliver, and support your orders.</li>
          <li>To respond to your contact messages.</li>
          <li>To detect and prevent fraud, abuse, and unauthorised access.</li>
          <li>
            To comply with our legal obligations — for example, retaining sales
            records for tax and accounting purposes.
          </li>
        </ul>

        <h2>5. Who we share it with</h2>
        <p>We share the minimum necessary, only with parties that help us run the store:</p>
        <ul>
          <li>
            <strong>Paystack</strong> (payment processing) — receives your email
            address and the order amount. Paystack's privacy practices are
            described at <a href="https://paystack.com/privacy" target="_blank" rel="noopener noreferrer">paystack.com/privacy</a>.
          </li>
          <li>
            <strong>Delivery partners</strong> — receive your name, delivery
            address, and phone number so your order can be delivered.
          </li>
        </ul>
        <p>
          We do not share your information with anyone else. If we ever need to
          (for example, to comply with a lawful request from a government
          authority), we will disclose only what is legally required and will
          notify you unless legally prohibited from doing so.
        </p>

        <h2>6. Cookies and local storage</h2>
        <p>
          We do not use tracking cookies. Your shopping cart is stored in your
          browser's <code>localStorage</code> so it survives a page refresh or
          browser restart. It lives on <em>your</em> device — we don't see it until
          you check out.
        </p>
        <p>
          You can clear this at any time through your browser's settings
          (usually "Clear site data" or "Clear browsing data"). Doing so will
          empty your cart.
        </p>

        <h2>7. Your rights</h2>
        <p>
          Under Ghana's Data Protection Act, 2012 (Act 843), you have the right
          to:
        </p>
        <ul>
          <li><strong>Access</strong> — ask what personal data we hold about you.</li>
          <li><strong>Correction</strong> — ask us to correct inaccurate data.</li>
          <li><strong>Deletion</strong> — ask us to delete your data where we aren't required to keep it.</li>
          <li><strong>Objection</strong> — object to certain uses of your data.</li>
        </ul>
        <p>
          If you are located in the EU or UK, rights under the GDPR (including the
          right to data portability and the right to lodge a complaint with a
          supervisory authority) also apply to you.
        </p>
        <p>
          To exercise any of these rights, email{" "}
          <a href="mailto:support@e-millennial.com">support@e-millennial.com</a>.
          We'll respond within 30 days.
        </p>

        <h2>8. Data retention</h2>
        <ul>
          <li>
            <strong>Order records</strong> are retained for <strong>6 years</strong>{" "}
            to comply with tax and accounting rules.
          </li>
          <li>
            <strong>Contact messages</strong> are retained for <strong>2 years</strong>,
            then deleted.
          </li>
          <li>
            <strong>Uploaded product images</strong> are retained until the
            associated product is removed from the store.
          </li>
        </ul>

        <h2>9. Accounts (coming soon)</h2>
        <p>
          User accounts are not yet available. When they are, we will collect your
          email address and a securely hashed password (never in plain text), and
          we will update this policy before accounts go live. If you've already
          placed an order as a guest, creating an account later will allow us to
          link your past orders to that account only with your explicit consent.
        </p>

        <h2>10. Changes to this policy</h2>
        <p>
          If we make material changes to how we handle your data, we will update
          the "Last updated" date at the top of this page and — if you have an
          account with us at that time — notify you by email. Continued use of
          the store after a policy change means you accept the updated terms.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions, concerns, or requests about your data? Email{" "}
          <a href="mailto:support@e-millennial.com">support@e-millennial.com</a>{" "}
          or use our <a href="/contact">contact form</a>.
        </p>
      </article>
    </div>
  );
}