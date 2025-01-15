// src/pages/BusinessAuth.js
import React, { useState } from "react";
import { Container, Row, Form, Button, Alert, Modal } from "react-bootstrap";
import BusinessLayout from "../../components/Layout/BusinessLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./BusinessAuth.css"; // Import CSS

const BusinessAuth = () => {
  const [formData, setFormData] = useState({
    salonName: "",
    phoneNumber: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const navigate = useNavigate(); // For navigation to login

  const API_URL = `${process.env.REACT_APP_API}api/auth/business/admin/register`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError(null);

    try {
      const response = await axios.post(API_URL, formData);
      console.log("Signup successful:", response.data);
      setShowModal(true); // Show success modal
      setTimeout(() => {
        setShowModal(false); // Close the modal
        navigate("/login"); // Redirect to login page after 2 seconds
      }, 2000); // Delay for 2 seconds

      setFormData({
        salonName: "",
        phoneNumber: "",
        streetAddress: "",
        postalCode: "",
        city: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setGeneralError(err.response?.data?.message || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <BusinessLayout>
      <Container fluid className="business-auth-container">
        <Row className="w-100 justify-content-center mx-0">
          <div className="business-auth-box">
            <h2 className="text-center mb-4">Create Business Account</h2>

            {generalError && <Alert variant="danger">{generalError}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formSalonName">
                <Form.Label>Salon Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter salon name"
                  name="salonName"
                  value={formData.salonName}
                  onChange={handleChange}
                  isInvalid={!!errors.salonName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.salonName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  isInvalid={!!errors.phoneNumber}
                  pattern="^\d{10,15}$"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
                <Form.Text muted>
                  Enter a valid phone number (10-15 digits).
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStreetAddress">
                <Form.Label>Street Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter street address"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  isInvalid={!!errors.streetAddress}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.streetAddress}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPostalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter postal code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  isInvalid={!!errors.postalCode}
                  pattern="^\d{5,6}$"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.postalCode}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  minLength={6}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="dark"
                type="submit"
                className="business-auth-button"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </Form>
          </div>
        </Row>

        {/* Success Modal */}
        <Modal show={showModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your account has been created successfully!</Modal.Body>
        </Modal>
      </Container>
    </BusinessLayout>
  );
};

export default BusinessAuth;
