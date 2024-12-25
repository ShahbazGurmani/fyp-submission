import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import backgroundImage from "../../../images/aboutSalon.jpg"; // Use the correct path to your background image
import "../../../styles/HomePage/AboutSection.css"; // Ensure correct CSS path

const AboutSection = () => {
  return (
    <div
      className="about-section" // Apply class for background and container
      style={{
        backgroundImage: `url(${backgroundImage})`, // Inline background image
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Left Column: Empty space for the image */}
          <Col md={7}></Col>

          {/* Right Column: Text and Call to Action */}
          <Col md={5}>
            <Card className="about-section-card">
              <h3>List your salon or services on SalonSphere</h3>
              <p>
                Would you like millions of customers to explore your salon and
                beauty services? So would we!
              </p>
              <p>
                It’s simple: we help you list your services online, assist you
                in managing bookings, and help customers find your salon
                effortlessly. Get started today and grow your business with
                SalonSphere!
              </p>
              {/* Use the Link directly as a button */}
              <Link to="/business-signup" className="custom-button">
                Get started
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutSection;
