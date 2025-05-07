import React from 'react';
import '../styles/home.css';

function Home() {
  return (
    <div className="home-container">
      <section className="home-content">
        {/* Hero Image */}
        {/* <img 
          src="/images/trade.webp" 
          alt="Global Trade" 
          className="home-image" 
        /> */}

        <h1>Global Trade Gateway</h1>
        <p>
          Welcome to our international import and export platform. We connect businesses across borders,
          enabling smooth and secure global product exchange.
        </p>

        <div className="features">
          <div className="feature-box">🌐 Worldwide Reach</div>
          <div className="feature-box">🔐 Secure Transactions</div>
          <div className="feature-box">🚚 Efficient Logistics</div>
        </div>

        <div className="home-buttons">
          <a href="/about" className="home-button">Learn More</a>
          <a href="/contact" className="home-button secondary">Contact Us</a>
        </div>

        <div className="partners">
          <p><strong>Trusted by businesses in:</strong></p>
          <div className="flags">
            🌎 🇺🇸 🇨🇳 🇮🇳 🇩🇪 🇧🇷 🇯🇵 🇬🇧 🇦🇺 🇿🇦
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
