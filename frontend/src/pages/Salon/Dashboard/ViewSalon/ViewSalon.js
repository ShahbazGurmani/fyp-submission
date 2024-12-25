import React, { useState, useEffect } from "react";
import axios from "axios";
import SalonLayout from "../../../../components/SalonLayout/SalonLayout";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./ViewSalon.css";

const ViewSalon = () => {
  const [salonProfile, setSalonProfile] = useState(null);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    const auth = authData ? JSON.parse(authData) : null;
    const userId = auth?.user?._id;

    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}api/salon/view-salon/${userId}`
        );
        setSalonProfile(response.data.salonProfile);
      } catch (error) {
        console.error("Error fetching salon data:", error);
      }
    };

    fetchData();
  }, []);

  if (!salonProfile) {
    return <div>Loading...</div>;
  }

  const coverImageUrl = `${
    process.env.REACT_APP_API
  }${salonProfile.coverImage.replace(/^\/+/, "")}`;

  const galleryImages = salonProfile.images.map((img) => ({
    original: `${process.env.REACT_APP_API}${img.replace(/^\/+/, "")}`,
    thumbnail: `${process.env.REACT_APP_API}${img.replace(/^\/+/, "")}`,
  }));

  return (
    <SalonLayout>
      <div className="salon-profile-container">
        <h1 className="salon-name">{salonProfile.name}</h1>

        {/* Display Cover Image */}
        <img src={coverImageUrl} alt="Cover" className="cover-image" />

        {/* Gallery Section */}
        <div className="gallery-section">
          <h2>Gallery</h2>
          <ImageGallery items={galleryImages} />
        </div>

        {/* Salon Description */}
        <div className="salon-description">
          <h2>Description</h2>
          <p>{salonProfile.description}</p>
        </div>

        {/* Location Information */}
        <div className="location-info">
          <h2>Location</h2>
          <p>
            <strong>Address:</strong> {salonProfile.address},{" "}
            {salonProfile.city}
          </p>
          <p>
            <strong>Coordinates:</strong> {salonProfile.location.latitude},{" "}
            {salonProfile.location.longitude}
          </p>
          <p>
            <strong>Salon Type:</strong> {salonProfile.salonType.join(", ")}
          </p>
        </div>

        {/* SALON */}
        <div className="location-info">
          <h2>About Us</h2>

          <p>
            <p>{salonProfile.about}</p>
          </p>
        </div>

        {/* Stylists Section with Card Layout */}
        <div className="stylists-section">
          <h2>Our Stylists</h2>
          <div className="card-container">
            {salonProfile.stylists.map((stylist) => (
              <div key={stylist._id} className="stylist-card">
                <h3>{stylist.name}</h3>
                <p>
                  <strong>Experience:</strong> {stylist.experience} years
                </p>
                <p>
                  <strong>Expertise:</strong> {stylist.expertise}
                </p>
                <p>
                  <strong>About:</strong> {stylist.about}
                </p>
                <div className="time-slots">
                  <h4>Available Slots</h4>
                  {stylist.dateTimeSlots.map((slot) => (
                    <div key={slot._id}>
                      <p>
                        <strong>Date:</strong> {slot.date}
                      </p>
                      <p>
                        <strong>Times:</strong> {slot.times.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section with Card Layout */}
        <div className="services-section">
          <h2>Our Services</h2>
          <div className="card-container">
            {salonProfile.services.map((service) => (
              <div key={service._id} className="service-card">
                <h3>{service.type}</h3>
                {service.options.map((option) => (
                  <p key={option._id}>
                    <strong>{option.name}:</strong> ${option.price}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SalonLayout>
  );
};

export default ViewSalon;
