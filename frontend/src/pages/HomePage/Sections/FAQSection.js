import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../../styles/HomePage/FAQSection.css";

const FAQSection = () => {
  return (
    <Container className="faq-section mt-5">
      <Row>
        <Col>
          <h1 className="faq-title">
            Find the best salons and services on SalonSphere
          </h1>
          <p className="faq-intro">
            Are you ready to elevate your beauty routine? Whether you're looking
            for a relaxing spa experience, a haircut, or beauty services at
            home, **SalonSphere** is here to help you find the best salons and
            services near you.
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3 className="faq-heading">What's new?</h3>
          <ul className="faq-new-list">
            <li>✔ A variety of salons offering unique beauty services.</li>
            <li>
              ✔ High-quality professionals to take care of your beauty needs.
            </li>
            <li>✔ In-home beauty services for your convenience.</li>
            <li>
              ✔ NEW: SalonSphere Online Booking! Book your appointments online
              and save time.
            </li>
          </ul>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3 className="faq-heading">Frequently Asked Questions</h3>

          <div className="faq-question">
            <h4>How can I book a salon appointment?</h4>
            <p>
              To book an appointment, simply browse through the list of salons
              and services available near you on SalonSphere. Choose the service
              and the time that works best for you, then confirm your booking
              with just a few clicks!
            </p>
          </div>

          <div className="faq-question">
            <h4>What kind of services can I book?</h4>
            <p>
              SalonSphere offers a variety of services including haircuts,
              facials, massages, manicures, pedicures, and much more. You can
              even book in-home services for extra convenience.
            </p>
          </div>

          <div className="faq-question">
            <h4>Does SalonSphere offer 24/7 booking?</h4>
            <p>
              Yes, you can book services on SalonSphere 24/7! However, available
              service hours depend on the individual salon or professional you
              choose. Make sure to check their operating hours before booking.
            </p>
          </div>

          <div className="faq-question">
            <h4>Can I pay with cash or card?</h4>
            <p>
              Yes, most of the salons and professionals on SalonSphere accept
              both cash and card payments. Please check the payment methods
              accepted by the service provider during booking.
            </p>
          </div>

          <div className="faq-question">
            <h4>How can I pay online?</h4>
            <p>
              You can easily pay online through our secure payment gateway using
              your credit or debit card. You will receive an instant booking
              confirmation once the payment is processed.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQSection;
