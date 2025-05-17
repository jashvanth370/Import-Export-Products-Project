import '../styles/About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About Us</h1>
        <p className="emoji">🌍📦💼</p>
        <p>
          <strong>Welcome to our Import-Export Management Platform</strong> — your reliable gateway for seamless international trade.
        </p>
        <p>
          We streamline export and import processes by connecting exporters, importers, and government officers in a secure and efficient environment.
        </p>
        <p>
          Whether you're a business expanding globally or a regulator monitoring cross-border trade, our tools simplify documentation, approvals, and logistics.
        </p>
        <p>
          Join us in making cross-border trade faster, safer, and smarter.
        </p>

        <h2>🚀 Our Team</h2>
        <div className="team-section">
          <div className="team-card">
            <img src="./images/Alex.jpg" alt="Alex" />
            <h4>Alex Fernando</h4>
            <p>Founder & CEO</p>
          </div>
          <div className="team-card">
            <img src="./images/sara.webp" alt="Sara" />
            <h4>Sara Wijesinghe</h4>
            <p>Lead Developer</p>
          </div>
          <div className="team-card">
            <img src="./images/nimal.webp" alt="Nimal" />
            <h4>Nimal Perera</h4>
            <p>Trade Consultant</p>
          </div>
        </div>

        <h2>📅 Our Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <span>2022</span>
            <p>Founded with a vision for smarter trade</p>
          </div>
          <div className="timeline-item">
            <span>2023</span>
            <p>Launched exporter/importer dashboard</p>
          </div>
          <div className="timeline-item">
            <span>2024</span>
            <p>Integrated shipment tracking & payments</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
