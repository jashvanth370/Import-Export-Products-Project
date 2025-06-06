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
        {/* Contact Info Section */}
        <div className="contact-info">
          <h2><i className="fas fa-comments"></i> Get in Touch</h2>
          <p><i className="fas fa-envelope"></i> support@importexport.com</p>
          <p><i className="fas fa-phone-alt"></i> +94 77 123 4567</p>
          <p><i className="fas fa-map-marker-alt"></i> Colombo, Sri Lanka</p>

          <div className="social-links">
            <h3><i className="fas fa-share-alt"></i> Follow Us</h3>
            <a href="#"><i className="fab fa-facebook-square"></i> Facebook</a>
            <a href="#"><i className="fab fa-twitter-square"></i> Twitter</a>
            <a href="#"><i className="fab fa-linkedin"></i> LinkedIn</a>
            <a href="#"><i className="fab fa-instagram"></i> Instagram</a>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form-section">
          <h2><i className="fas fa-envelope-open-text"></i> Contact Us</h2>
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

            <button type="submit"><i className="fas fa-paper-plane"></i> Send Message</button>
          </form>
        </div>
      </div>

      {/* Optional Map Section */}
      <div className="map-section">
        <h3><i className="fas fa-map"></i> Our Location</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63335.51003292189!2d79.8380058!3d6.9270788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593eae26c165%3A0x712c49f6f187535b!2sColombo!5e0!3m2!1sen!2slk!4v1715940355606!5m2!1sen!2slk"
          loading="lazy"
          allowFullScreen=""
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
