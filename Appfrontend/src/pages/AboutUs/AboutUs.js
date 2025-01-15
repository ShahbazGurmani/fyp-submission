import React from "react";
import Layout from "../../components/Layout/Layout";
import salonImage1 from "../../images/abs1.jpeg"; // Replace with actual image paths
import salonImage2 from "../../images/abs2.jpeg";
import salonImage3 from "../../images/abs3.png";
import { Link } from "react-router-dom";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <Layout>
      <div className="about-us-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to Salon Sphere</h1>
            <p>
              Revolutionizing the beauty industry, Salon Sphere bridges the gap
              between salon owners and users by creating a seamless platform for
              exceptional beauty services. For salon owners, it’s a
              game-changer—offering innovative tools to manage bookings,
              showcase services, and grow their customer base with ease. Users,
              on the other hand, can explore nearby salons, compare offerings,
              and book appointments effortlessly—all from the comfort of their
              devices. At Salon Sphere, we understand the challenges of the
              modern beauty industry. That’s why we’ve built a platform designed
              to empower business owners with analytics, customer insights, and
              marketing tools, helping them stay ahead in a competitive market.
              Meanwhile, users enjoy the convenience of real-time availability,
              verified reviews, and a wide array of services tailored to their
              needs. Whether you’re a salon owner seeking to expand your reach
              or a beauty enthusiast looking for trusted professionals, Salon
              Sphere redefines the way beauty services are accessed and
              delivered. Join us in shaping a community where beauty meets
              innovation, and experience the transformation firsthand!
            </p>
          </div>
          <img
            src={salonImage1}
            alt="Platform Overview"
            className="hero-image"
          />
        </section>

        {/* About Us Section */}
        <section className="about-us-section zig-zag">
          <img
            src={salonImage2}
            alt="Salon Services"
            className="about-us-image"
          />
          <div className="content">
            <h2>About Salon Sphere</h2>
            <p>
              Salon Sphere is more than a platform; it's a movement designed to
              empower salon owners and provide users with seamless access to
              premium beauty services. Whether you're a salon owner looking to
              grow your business or a user in search of trusted professionals,
              Salon Sphere is your go-to destination.
            </p>
          </div>
        </section>

        {/* For Users Section */}
        <section className="about-us-section zig-zag reverse">
          <div className="content">
            <h2>For Users</h2>
            <p>
              Discover nearby salons, compare services, and book appointments
              instantly through Salon Sphere. With user-friendly tools and
              real-time availability, achieving your beauty goals has never been
              easier.
            </p>
          </div>
          <img
            src={salonImage3}
            alt="User Experience"
            className="about-us-image"
          />
        </section>

        {/* For Salon Owners Section */}
        <section className="about-us-section zig-zag">
          <img
            src={salonImage1}
            alt="Salon Owners"
            className="about-us-image"
          />
          <div className="content">
            <h2>For Salon Owners</h2>
            <p>
              Maximize your salon’s potential with our innovative tools. Manage
              bookings, showcase your services, and connect with new clients
              effortlessly. Salon Sphere is designed to help you grow your
              business and stand out in the competitive beauty market.
            </p>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-us-section">
          <h2>Why Choose Salon Sphere?</h2>
          <ul>
            <li>
              <strong>Seamless Connectivity:</strong> Connect users and salons
              effortlessly.
            </li>
            <li>
              <strong>Real-Time Bookings:</strong> Instant appointments and
              availability.
            </li>
            <li>
              <strong>Comprehensive Tools:</strong> Tools tailored for salon
              owners to manage and grow their business.
            </li>
            <li>
              <strong>Trusted Network:</strong> Verified salons and user reviews
              for quality assurance.
            </li>
          </ul>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <h2>Join the Salon Sphere Revolution!</h2>
          <p>
            Whether you're a salon owner or a beauty enthusiast, Salon Sphere is
            here to transform the way you connect with the beauty industry. Sign
            up today and experience a world of beauty at your fingertips.
          </p>
          <button className="cta-button">
            <Link
              to="/business-signup"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Get Started
            </Link>
          </button>
        </section>
      </div>
    </Layout>
  );
};

export default AboutUs;
