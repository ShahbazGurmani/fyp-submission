import React from 'react';
import Layout from '../components/Layout/Layout';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
const FutureWork = () => {
 
  return (
    <Layout>
      <Container className="text-center my-5">
        <Row>
          <Col md={8} className="mx-auto">
            <Card className="shadow-lg rounded">
              <Card.Body>
                <h2 className="fw-bold mb-4">Future Work: Coming Soon!</h2>
                <p className="lead mb-4">
                  We're currently working on something exciting! Stay tuned for updates and new features. Our team is working hard to bring you the best experience.
                </p>
                <p className="mb-4">
                  Check back soon to see what's coming up next. We appreciate your patience!
                </p>
                  <button className="cta-button">
                                            <Link
                                              to="/"
                                              style={{ color: "inherit", textDecoration: "none" }}
                                            >
                                              Home Page
                                            </Link>
                                          </button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default FutureWork;
