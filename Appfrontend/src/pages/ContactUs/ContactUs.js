import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const ContactUs = () => {
    return (
        <Layout>
            <Container fluid className="py-5">
                <Row className="justify-content-center">
                    <Col xs={12} lg={10}>
                        <Card className="shadow-lg rounded">
                            <Card.Body>
                                <Card.Title className="text-center fw-bold mb-4">Contact Us</Card.Title>

                                {/* Support Team Section */}
                                <section className="mb-5">
                                    <h3 className="fw-bold">Support Team - Available 24/7</h3>
                                    <p>
                                        Our support team is always ready to assist you with any questions or issues. Whether you need help booking an appointment, managing your salon services, or have general inquiries, we are available round the clock.
                                    </p>
                                    <p>
                                        Don't hesitate to reach out, our team is here to ensure that your experience with Salon Sphere is seamless and enjoyable.
                                    </p>
                                </section>

                                {/* Contact Us Section */}
                                <section className="mb-5">
                                    <h3 className="fw-bold">Get in Touch</h3>
                                    <p>
                                        If you have any inquiries or require assistance, please feel free to contact us through the form on our website or via the details provided below. Our team will get back to you as soon as possible.
                                    </p>
                                    <p>
                                        For any urgent matters, we recommend reaching out through email or phone.
                                    </p>
                                </section>

                                {/* Email Contact Section */}
                                <section className="mb-5">
                                    <h3 className="fw-bold">Email Contact</h3>
                                    <p>
                                        You can reach us directly via email at <strong>support@salonsphere.com</strong>. Our team strives to respond to all queries as quickly as possible, and we are committed to providing the assistance you need. Please expect a reply within 24-48 hours.
                                    </p>
                                    <p>
                                        We value your feedback and look forward to helping you with any of your concerns.
                                    </p>
                                </section>

                                {/* Call to Action */}
                                <div className="text-center mt-4">
                                    <Button variant="primary" href="mailto:support@salonsphere.com?subject=Support Inquiry" size="lg">
                                        Contact Us via Email
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default ContactUs;
