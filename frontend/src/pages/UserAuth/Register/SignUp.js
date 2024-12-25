// src/components/Auth/SignUp.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Form, Button, Alert } from "react-bootstrap";
import Layout from "../../../components/Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css"; // Custom CSS imported after Bootstrap

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = `${process.env.REACT_APP_API}api/auth/register`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_URL, formData);
      console.log("Signup successful:", response.data);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container fluid className="signupContainer">
        <Row className="w-100 justify-content-center mx-0">
          <div className="signupBox">
            <h2 className="text-center mb-4">Create an Account</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">
                Signup successful! Redirecting to login page...
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <div className="formRow">
                <Form.Group className="flex-grow-1" controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group className="flex-grow-1" controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </Form.Group>
              </div>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="signupButton"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>

              <div className="text-center mt-3">
                <p className="mb-0">
                  Already have an account?{" "}
                  <a href="/login" className="loginLink">
                    Log In
                  </a>
                </p>
              </div>
            </Form>
          </div>
        </Row>
      </Container>
    </Layout>
  );
};

export default SignUp;
