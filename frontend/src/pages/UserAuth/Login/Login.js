// src/components/Login.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Form, Button, Alert } from "react-bootstrap";
import logo from "../../../images/SsLogo.png";
import Layout from "../../../components/Layout/Layout";
import "./Login.css"; // Import CSS for custom styling
import { useAuth } from "../../../context/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = `${process.env.REACT_APP_API}api/auth/login`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_URL, { email, password });
      console.log("Login successful:", response.data);
      setSuccess(true);
      setAuth({
        ...auth,
        user: response.data.user,
        token: response.data.token,
      });
      localStorage.setItem("auth", JSON.stringify(response.data));
      const userRole = response.data.user.role;

      if (userRole === 1) {
        setTimeout(() => {
          navigate("/dashboard/admin");
        }, 2000);
      } else if (userRole === 2) {
        setTimeout(() => {
          navigate("/dashboard/salon");
        }, 2000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container fluid className="login-container">
        <Row className="w-100 justify-content-center">
          <div className="login-box">
            <img src={logo} alt="Logo" className="login-logo" />
            <h2 className="text-center mb-4">Welcome Back</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">
                Login successful! Redirecting ......
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                variant="dark"
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center mt-3">
                <Button variant="link" className="forgot-password">
                  Forgot Password?
                </Button>
                <Button variant="link" className="signup-button">
                  Sign Up
                </Button>
              </div>
            </Form>
          </div>
        </Row>
      </Container>
    </Layout>
  );
};

export default Login;
