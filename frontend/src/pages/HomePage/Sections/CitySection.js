import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../styles/HomePage/CitySection.css"; // Ensure correct path for the CSS file

// Importing images
import islamabadPic from "../../../images/isl.jpg";
import karachiPic from "../../../images/karachi-.jpg";
import lahorePic from "../../../images/lahore.jpg";
import faisalabadPic from "../../../images/fsd.jpg";
import rawalpindiPic from "../../../images/pendi.jpg";
import abbottabadPic from "../../../images/abtbd.jpg";
import bahawalpurPic from "../../../images/bhwlpr.jpg";
import deraGhaziKhanPic from "../../../images/dgk.jpg";

const cities = [
  {
    name: "Islamabad",
    image: islamabadPic, // Use the imported variable directly
    link: "/cities/islamabad",
  },
  {
    name: "Karachi",
    image: karachiPic, // Use the correct imported image
    link: "/cities/karachi",
  },
  {
    name: "Lahore",
    image: lahorePic,
    link: "/cities/lahore",
  },
  {
    name: "Faisalabad",
    image: faisalabadPic,
    link: "/cities/faisalabad",
  },
  {
    name: "Rawalpindi",
    image: rawalpindiPic,
    link: "/cities/rawalpindi",
  },
  {
    name: "Abbottabad",
    image: abbottabadPic,
    link: "/cities/abbottabad",
  },
  {
    name: "Bahawalpur",
    image: bahawalpurPic,
    link: "/cities/bahawalpur",
  },
  {
    name: "DGK",
    image: deraGhaziKhanPic,
    link: "/cities/dera-ghazi-khan",
  },
];

const CitySection = () => {
  return (
    <Container className="city-section">
      <h2 className="text-center mb-4">
        Find us in these cities and many more!
      </h2>
      <Row>
        {cities.map((city, index) => (
          <Col xs={6} md={6} lg={3} key={index} className="mb-4">
            <Link to={city.link} className="city-link">
              <Card className="city-card">
                <div className="city-image-container">
                  <img
                    src={city.image} // This should now display correctly
                    alt={city.name}
                    className="city-image"
                  />
                </div>
                <Card.Body>
                  <Card.Text className="city-name">{city.name}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CitySection;
