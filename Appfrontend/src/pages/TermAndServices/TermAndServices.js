import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const TermAndServices = () => {
  return (
    <Layout>
      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            <Card className="shadow-lg rounded">
              <Card.Body>
                <Card.Title className="text-center fw-bold mb-4">Terms and Conditions</Card.Title>
                
                <p className="mb-4">
                  Welcome to SalonSphere! By using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our services.
                </p>
                
                <h5 className="fw-bold">1. General Terms</h5>
                <p>
                  SalonSphere provides an online platform that connects salon owners with customers. By accessing and using our platform, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
                </p>
                
                <h5 className="fw-bold mt-4">2. Account Registration</h5>
                <p>
                  To use the services provided by SalonSphere, you must create an account. You agree to provide accurate and up-to-date information during the registration process. You are responsible for maintaining the confidentiality of your account credentials.
                </p>
                
                <h5 className="fw-bold mt-4">3. Salon Owner Responsibilities</h5>
                <p>
                  As a salon owner, you agree to maintain up-to-date information about your services, availability, pricing, and any other relevant data. SalonSphere is not responsible for the accuracy of the information provided by salon owners.
                </p>
                
                <h5 className="fw-bold mt-4">4. User Responsibilities</h5>
                <p>
                  As a user, you agree to use the platform only for lawful purposes and to provide accurate information when booking services. You agree not to engage in any activity that could harm or disrupt the platform or its services.
                </p>
                
                <h5 className="fw-bold mt-4">5. Payment and Pricing</h5>
                <p>
                  All prices displayed on SalonSphere are for informational purposes only. Salon owners may update their pricing, and users are responsible for paying the correct price at the time of booking.
                </p>
                
                <h5 className="fw-bold mt-4">6. Cancellations and Refunds</h5>
                <p>
                  Cancellations or changes to appointments must be made according to the salon's policies. Users and salon owners should adhere to their respective cancellation and refund policies.
                </p>
                
                <h5 className="fw-bold mt-4">7. Privacy and Data Protection</h5>
                <p>
                  SalonSphere takes your privacy seriously. We collect and use personal data as described in our Privacy Policy. By using the platform, you consent to the collection and use of your personal data in accordance with our Privacy Policy.
                </p>
                
                <h5 className="fw-bold mt-4">8. Limitation of Liability</h5>
                <p>
                  SalonSphere is not responsible for any issues, damages, or losses arising from the use of the platform, including but not limited to any problems with booking, cancellations, or payments.
                </p>
                
                <h5 className="fw-bold mt-4">9. Changes to Terms</h5>
                <p>
                  SalonSphere reserves the right to modify or update these Terms and Conditions at any time. We will notify users of any significant changes, and continued use of the platform constitutes acceptance of the updated terms.
                </p>
                
                <h5 className="fw-bold mt-4">10. Governing Law</h5>
                <p>
                  These Terms and Conditions are governed by the laws of the jurisdiction in which SalonSphere operates. Any disputes will be resolved in the appropriate courts.
                </p>
                
                <div className="text-center mt-4">
                  <Button variant="primary" href="/contact-us" size="lg">
                    Contact Us for More Information
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

export default TermAndServices;
