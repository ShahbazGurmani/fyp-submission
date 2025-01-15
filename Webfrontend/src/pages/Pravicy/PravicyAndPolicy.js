import React from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./PravicyAndPolicy.css"
const PrivacyAndPolicy = () => {
  return (
    <Layout>
      <div className="privacy-policy-container">

      

        {/* Content Section */}
        <section className="content-section py-5">
          <Container>
            <Row>
              <Col lg={8} className="mx-auto">
                <Card className="shadow-lg rounded">
                  <Card.Body>
                    <h2 className="text-center fw-bold mb-4">Privacy Policy Overview</h2>
                    <p className="mb-4">
                      At Salon Sphere, we prioritize the privacy of our users. This document explains how we collect, use, and safeguard your data. By using our platform, you agree to the practices outlined here.
                    </p>

                    {/* Data Collection */}
                    <h3 className="fw-bold">Data Collection</h3>
                    <p>
                      We collect the following personal information when you interact with our platform:
                    </p>
                    <ul>
                      <li><strong>Name:</strong> To identify you.</li>
                      <li><strong>Email:</strong> For account-related notifications.</li>
                      <li><strong>Phone Number:</strong> For appointment reminders and notifications.</li>
                      <li><strong>Booking Details:</strong> To process and confirm appointments.</li>
                    </ul>

                    {/* Data Usage */}
                    <h3 className="fw-bold mt-4">How We Use Your Data</h3>
                    <p>
                      Your data is used primarily to:
                    </p>
                    <ul>
                      <li>Confirm and manage your appointments.</li>
                      <li>Provide personalized offers and reminders.</li>
                      <li>Improve the services we offer through analytics.</li>
                    </ul>

                    {/* Data Protection */}
                    <h3 className="fw-bold mt-4">Data Protection</h3>
                    <p>
                      We take reasonable measures to protect your personal data, including using encryption and secure storage methods. We do not share your data with third parties without your explicit consent.
                    </p>

                    {/* Your Rights */}
                    <h3 className="fw-bold mt-4">Your Rights</h3>
                    <p>
                      You have the right to request access, correction, or deletion of your personal information. Please reach out to us at <strong>[contact information]</strong> to exercise these rights.
                    </p>

                    {/* Call to Action */}
                    <div className="text-center mt-5">
                      <Button variant="primary" href="/contact-us" size="lg">
                        Contact Us
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us-section py-5 bg-light">
          <Container>
            <Row>
              <Col md={12}>
                <h2 className="fw-bold text-center mb-4">Why Choose Salon Sphere?</h2>
                <ul className="list-unstyled">
                  <li><i className="bi bi-check-circle-fill"></i> Seamless Connectivity between salons and users.</li>
                  <li><i className="bi bi-check-circle-fill"></i> Real-time bookings for immediate appointments.</li>
                  <li><i className="bi bi-check-circle-fill"></i> Advanced tools for salon management and growth.</li>
                  <li><i className="bi bi-check-circle-fill"></i> Verified salons and customer reviews for quality assurance.</li>
                </ul>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section py-5 bg-primary text-white text-center">
          <Container>
            <Row>
              <Col md={12}>
                <h2 className="fw-bold mb-4">Join the Salon Sphere Revolution!</h2>
                <p>Whether you’re a salon owner or a user, Salon Sphere is here to transform the beauty industry. Sign up today and experience seamless beauty services at your fingertips!</p>
                 <button className="cta-button">
                            <Link
                              to="/business-signup"
                              style={{ color: "inherit", textDecoration: "none" }}
                            >
                              Get Started
                            </Link>
                          </button>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyAndPolicy;
