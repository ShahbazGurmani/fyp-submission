import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Card,
  Modal,
} from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet's CSS
import Lpimage2 from "../../../images/Lpimage2.png"; // Ensure correct image path
import "../../../styles/HomePage/HeroSection.css"; // Ensure correct CSS path

const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState("");
  const [address, setAddress] = useState(""); // Separate state for the input field

  // Handler to open the modal and request location
  const handleLocateMeClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setShowModal(true);
        },
        (error) => {
          setError("Location access denied or unavailable.");
          setShowModal(true);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setShowModal(true);
    }
  };

  // Handler to close the modal
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="hero-section">
      <Container>
        <Row className="align-items-center hero-row">
          {/* Left Section: Text and Search (7 columns) */}
          <Col xs={12} md={7} className="hero-text-section ml-md-5">
            <h1>Welcome to SalonSphere,</h1>
            <h2>
              Where the salon services you love are delivered to your door.
            </h2>

            {/* Card wrapping only the search section */}
            <Card className="search-card p-4 mt-3">
              <InputGroup className="search-bar">
                <Form.Control
                  type="text"
                  placeholder="Your street OR Postal code"
                  value={address} // Bind the input field to the `address` state (separate from lat/lon)
                  onChange={(e) => setAddress(e.target.value)} // Update address as user types
                  className="hero-input"
                />

                <Button className="find-button">Find Salon</Button>

                <InputGroup.Text
                  className="locate-icon"
                  onClick={handleLocateMeClick}
                >
                  Locate me
                </InputGroup.Text>
              </InputGroup>
            </Card>
          </Col>

          {/* Right Section: Image (5 columns) */}
          <Col xs={12} md={5} className="hero-image-section">
            <img src={Lpimage2} alt="Salon services" className="hero-image" />
          </Col>
        </Row>

        {/* Modal for "Locate me" functionality */}
        <Modal
          show={showModal}
          onHide={handleClose}
          centered
          backdrop="static"
          keyboard={false}
          size="lg"
          className="custom-modal"
          style={{
            zIndex: 1050,
            marginTop: "50px", // Add margin-top here to move the modal down
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Your Current Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <p className="text-danger">{error}</p>}
            {!error && latitude && longitude ? (
              <div>
                <p>
                  Latitude: {latitude}, Longitude: {longitude}
                </p>
                {/* Leaflet map to show current location */}
                <MapContainer
                  center={[latitude, longitude]}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ height: "250px", width: "100%" }} // Reduced map height
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[latitude, longitude]}>
                    <Popup>
                      You are here: <br /> Lat: {latitude}, Long: {longitude}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            ) : (
              <p>Unable to retrieve location information. Please try again.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default HeroSection;
