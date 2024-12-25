import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/HomePage/GetApp.css"; // Ensure correct path for your CSS
import "../../../styles/HomePage/GetApp.css";
// Import your images (adjust paths as needed)
import appImage from "../../../images/getSalonApp.png"; // Replace with actual image path
import qrCode from "../../../images/qr.jpg"; // Replace with actual QR code image path

const GetApp = () => {
  return (
    <div className="get-app-section">
      <Container>
        <Row className="align-items-center">
          {/* Left Column: Text and Download Buttons */}
          <Col md={6} className="get-app-text">
            <h2>Put us in your pocket</h2>
            <h4>Download the salon services you love</h4>
            <p>
              It's all at your fingertips – the salons and services you love.
              Book the right service to suit your mood, and make your salon
              experience seamless. Download the app now!
            </p>
            <img src={qrCode} alt="QR Code" className="qr-code" />
            <div className="download-buttons">
              <a
                href="https://apps.apple.com" // Replace with actual App Store link
                target="_blank"
                rel="noopener noreferrer"
                className="store-button app-store"
              >
                Download on the App Store
              </a>
              <a
                href="https://play.google.com/store" // Replace with actual Play Store link
                target="_blank"
                rel="noopener noreferrer"
                className="store-button play-store"
              >
                Get it on Google Play Store
              </a>
            </div>
          </Col>

          {/* Right Column: App Image */}
          <Col md={6} className="get-app-image">
            <img src={appImage} alt="App Preview" className="app-image" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GetApp;
