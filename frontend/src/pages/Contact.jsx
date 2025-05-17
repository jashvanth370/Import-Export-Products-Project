import React, { useState } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p><i className="fas fa-envelope"></i> support@importexport.com</p>
          <p><i className="fas fa-phone-alt"></i> +94 77 123 4567</p>
          <p><i className="fas fa-map-marker-alt"></i> Colombo, Sri Lanka</p>
        </div>

        <div className="contact-form-section">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <label>Message</label>
            <textarea
              rows="5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
