import { useState } from "react";
import Login from "./login";
import "./form.css";

const galleryImages = [
  "src/images/gallery1.jpg",
  "src/images/gallery2.jpg",
  "src/images/gallery3.jpg",
  "src/images/gallery4.jpg",
  "src/images/gallery5.jpg",
  "src/images/gallery6.jpg",
];

function ComplexApp() {
  const [showLogin, setShowLogin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {/* LOGIN FORM */}
      {showLogin && <Login closeLogin={() => setShowLogin(false)} />}

      {/* HEADER */}
      <header className="header">
        <img className="mobile-logo" src="src/images/logo.png" alt="" />
        <p className="hideOnMobile">Store Locator</p>
        <p className="hideOnMobile">Sell on Website</p>

        <div className="search-box">
          <input type="search" placeholder="Search for products ..." />
          <button>Search</button>
        </div>

        <p className="hideOnMobile">Help?</p>
        <p className="hideOnMobile">Investors</p>
        <button onClick={() => setShowLogin(true)} className="sign-btn">
          Sign in
        </button>

        <img
          className="menu-icon"
          src="src/images/menu-icon.png"
          alt="menu"
          onClick={() => setSidebarOpen(true)}
        />
      </header>

      {/* SIDEBAR */}
      <nav className={`sidebar ${sidebarOpen ? "show" : ""}`}>
        <img
          className="close-icon"
          src="src/images/close.png"
          alt="close"
          onClick={() => setSidebarOpen(false)}
        />
        <img className="logo" src="src/images/logo.png" alt="" />
        <ul>
          <li>
            <a href="#">HOME</a>
          </li>
          <li>
            <a href="http://localhost:3000/about" target="blank">ABOUT</a>
          </li>
          <li>
            <a href="#">SERVICE</a>
          </li>
          <li>
            <a href="#">BLOG</a>
          </li>
          <li>
            <a href="#">CONTACT</a>
          </li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-words">
          <h1>Welcome to our world of creativity and innovation.</h1>
          <p>
            Building ideas that connect people so that your success starts right
            here. Bringing simplicity and style to your digital space to
            Explore, Create, and Inspire.
          </p>
          <h4>We make the web work for you.</h4>
          <br />
          <button className="hero-btn">Get Started</button>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="about-us">
        <div className="about-container">
          <h2>About Us</h2>
          <p>
            We are a team of passionate creators dedicated to bringing ideas to
            life through design and technology. Our goal is to craft meaningful
            digital experiences that inspire, engage, and deliver real value.
          </p>
          <p>
            With a focus on innovation, collaboration, and simplicity, we turn
            challenges into opportunities — helping businesses and individuals
            grow in the digital world.
          </p>
          <h4>Our Mission</h4>
          <p>
            To empower creativity and make technology accessible for everyone.
          </p>
          <button className="about-btn">Learn More</button>
        </div>
      </section>

      {/* IMAGE GALLERY SECTION */}
      <section className="gallery-carousel">
        <div className="gallery-container">
          <h2>Our Work</h2>
          <p>Explore our latest projects one by one.</p>

          <div className="carousel">
            <button className="arrow left-arrow" onClick={prevImage}>
              &#10094;
            </button>

            <img
              src={galleryImages[currentIndex]}
              alt={`Project ${currentIndex + 1}`}
            />

            <button className="arrow right-arrow" onClick={nextImage}>
              &#10095;
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <p>Hear from our satisfied clients and partners.</p>

        <div className="testimonials-container">
          <div className="testimonial-card">
            <h4>Excellent Service!</h4>
            <p>
              "The team delivered outstanding results and exceeded our
              expectations. Highly recommend!"
            </p>
            <span>- Jane Doe, CEO of Company</span>
          </div>

          <div className="testimonial-card">
            <h4>Creative & Professional</h4>
            <p>
              "Their creativity and professionalism helped our project come to
              life beautifully."
            </p>
            <span>- John Smith, Marketing Director</span>
          </div>

          <div className="testimonial-card">
            <h4>Reliable & Efficient</h4>
            <p>
              "Always on time, always on point. They make working with them so
              easy and enjoyable."
            </p>
            <span>- Sarah Lee, Entrepreneur</span>
          </div>

          <div className="testimonial-card">
            <h4>Profits</h4>
            <p>
              "Always on time, always on point. They make working with them so
              easy and enjoyable."
            </p>
            <span>- Sarah Lee, Entrepreneur</span>
          </div>

          <div className="testimonial-card">
            <h4>Flexibility</h4>
            <p>
              "Always on time, always on point. They make working with them so
              easy and enjoyable."
            </p>
            <span>- Sarah Lee, Entrepreneur</span>
          </div>

          <div className="testimonial-card">
            <h4>Quick and time saver</h4>
            <p>
              "Always on time, always on point. They make working with them so
              easy and enjoyable."
            </p>
            <span>- Sarah Lee, Entrepreneur</span>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section className="achievements-section">
        <div className="achievements-inner">
          <h2>Our Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement">
              <h3>250+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="achievement">
              <h3>120+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="achievement">
              <h3>50+</h3>
              <p>Creative Members</p>
            </div>
            <div className="achievement">
              <h3>10+</h3>
              <p>Years of Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="blog-section">
        <h2>Latest From Our Blog</h2>
        <br />
        <br />
        <div className="blog-grid">
          <div className="blog-card">
            <img src="src/images/gallery5.jpg" alt="Blog 1" />
            <div className="blog-content">
              <h3>Designing with Purpose</h3>
              <p>
                Discover how design thinking transforms everyday products into
                meaningful experiences.
              </p>
              <button className="blog-btn">
                {" "}
                <a href="#">Read More →</a>
              </button>
            </div>
          </div>

          <div className="blog-card">
            <img src="src/images/gallery6.jpg" alt="Blog 2" />
            <div className="blog-content">
              <h3>Tech Meets Art</h3>
              <p>
                Explore how technology and creativity blend to shape the digital
                world of tomorrow.
              </p>
              <button className="blog-btn">
                <a href="#">Read More →</a>
              </button>
            </div>
          </div>

          <div className="blog-card">
            <img src="src/images/gallery3.jpg" alt="Blog 3" />
            <div className="blog-content">
              <h3>Collaboration Matters</h3>
              <p>
                How working together helps us achieve better results for clients
                and the community.
              </p>
              <button className="blog-btn">
                {" "}
                <a href="#">Read More →</a>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
<section className="contact-section">
  <h2>Get In Touch</h2>
  <p>We’d love to hear from you! Send us a message below.</p>

  <form className="contact-form">
    <input type="text" placeholder="Your Name" required />
    <input type="email" placeholder="Your Email" required />
    <textarea placeholder="Your Message" rows="5" required></textarea>
    <button type="submit">Send Message</button>
  </form>
</section>


      {/* FOOTER SECTION */}
<footer className="footer">
  <div className="footer-container">
    <div className="footer-about">
      <h3>About Our Company</h3>
      <p>
        We create innovative and user-friendly web experiences that connect people 
        and businesses around the world. Let's build the future together.
      </p>
    </div>

    <div className="footer-links">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    <div className="footer-contact">
      <h3>Contact Us</h3>
      <p>Email: support@yourwebsite.com</p>
      <p>Phone: +234 800 123 4567</p>
      <p>Location: Lagos, Nigeria</p>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© {new Date().getFullYear()} YourWebsite. All Rights Reserved.</p>
  </div>
</footer>

    </>
  );
}

export default ComplexApp;
