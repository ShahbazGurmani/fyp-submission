import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/Footer.css"; // Ensure correct CSS path

// Assuming you have these icons and logo in your images folder
import logo from "../../images/SsLogo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa"; // Icons from react-icons library

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="footer-top">
          {/* Logo and Social Links */}
          <Col md={4} className="footer-logo">
            <img
              src={logo}
              alt="SalonSphere Logo"
              className="footer-logo-img"
            />
            <p>Your trusted platform for salon and beauty services.</p>
            <div className="footer-social-icons">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </Col>

          {/* Navigation Links */}
          <Col md={4} className="footer-links">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/term-and-services">Terms of Service</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </Col>

          {/* Services Links */}
          <Col md={4} className="footer-links">
            <h4>Services</h4>
            <ul>
              <li>
                <Link to="/coming-soon">Haircuts</Link>
              </li>
              <li>
                <Link to="/coming-soon">Makeup</Link>
              </li>
              <li>
                <Link to="/coming-soon">Spa Services</Link>
              </li>
              <li>
                <Link to="/coming-soon">Massage Therapy</Link>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row className="footer-bottom">
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} SalonSphere. All Rights
              Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
