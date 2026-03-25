import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Front-end only — show confirmation
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="page-wrapper contact">
      {/* Hero */}
      <section className="contact__hero">
        <p className="contact__label">Get in Touch</p>
        <h1 className="contact__title">Contact Me</h1>
        <p className="contact__subtitle">
          Have a question, opportunity, or just want to connect? Feel free to
          reach out.
        </p>
      </section>

      {/* Content */}
      <div className="contact__content">
        {/* Info Cards */}
        <div className="contact__info">
          <div className="contact-card">
            <div className="contact-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div>
              <p className="contact-card__label">Email</p>
              <p className="contact-card__value">
                <a href="mailto:Luke.krick02@outlook.com">Luke.krick02@outlook.com</a>
              </p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
            <div>
              <p className="contact-card__label">Phone</p>
              <p className="contact-card__value">
                <a href="tel:918-998-6021">(918) 998-6021</a>
              </p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card__icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div>
              <p className="contact-card__label">LinkedIn</p>
              <p className="contact-card__value">
                <a
                  href="https://www.linkedin.com/in/luke-krick/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/luke-krick
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Your message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="contact__submit">
            {submitted ? '✓ Message Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
