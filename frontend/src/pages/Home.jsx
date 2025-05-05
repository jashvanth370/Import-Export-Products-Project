import React from 'react'
import '../styles/home.css'

function Home() {
  return (
    <div className="home-container">
      <section className="home-content">
        <h1>Global Trade Gateway</h1>
        <p>
          Welcome to our international import and export platform. We connect businesses across borders,
          enabling smooth and secure global product exchange. Browse our offerings, discover markets,
          or contact us to grow your business internationally.
        </p>
        <div className="home-buttons">
          <a href="/about" className="home-button">About Us</a> <br />
          <a href="/contact" className="home-button secondary">Contact</a>
        </div>
      </section>
    </div>
  )
}

export default Home
