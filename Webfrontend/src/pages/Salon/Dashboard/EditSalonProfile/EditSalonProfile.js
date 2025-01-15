import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import SalonLayout from "../../../../components/SalonLayout/SalonLayout";

const EditSalonProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    about: "",
    address: "",
    city: "",
    location: { latitude: "", longitude: "" },
    salonType: [],
    coverImage: null,
    images: [],
  });
  const [stylists, setStylists] = useState([]); // Stylists fetched from API
  const [services, setServices] = useState([]); // Services fetched from API
  const [coverPreview, setCoverPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const salonTypeOptions = [
    { value: "Hair Salon", label: "Hair Salon" },
    { value: "Spa", label: "Spa" },
    { value: "Nail Salon", label: "Nail Salon" },
    { value: "Barber Shop", label: "Barber Shop" },
    { value: "Beauty Salon", label: "Beauty Salon" },
  ];

  const cityOptions = [
    { value: "Karachi", label: "Karachi" },
    { value: "Lahore", label: "Lahore" },
    { value: "Islamabad", label: "Islamabad" },
    { value: "Faisalabad", label: "Faisalabad" },
    { value: "Rawalpindi", label: "Rawalpindi" },
  ];

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
          `${process.env.REACT_APP_API}api/salon/edit-salon/${userId}`
        );
        const profile = response.data.salonProfile;

        // Normalize salonType data if necessary
        const normalizedSalonType = (profile.salonType || []).filter((type) =>
          salonTypeOptions.some((option) => option.value === type)
        );


        setFormData({
          name: profile.name || "",
          description: profile.description || "",
          about: profile.about || "",
          address: profile.address || "",
          city: profile.city || "",
          location: {
            latitude: profile.location?.latitude || "",
            longitude: profile.location?.longitude || "",
          },
          salonType: normalizedSalonType, // Correctly set initial value
        });
        setStylists(profile.stylists || []); // Populate stylists
        setServices(profile.services || []); // Populate services
        setCoverPreview(
          `${process.env.REACT_APP_API}${profile.coverImage.replace(/^\/+/, "")}`
        );
        setGalleryPreviews(
          profile.images.map((img) =>
            `${process.env.REACT_APP_API}${img.replace(/^\/+/, "")}`
          )
        );
      } catch (error) {
        console.error("Error fetching salon data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCityChange = (selectedOption) => {
    setFormData({ ...formData, city: selectedOption?.value || "" });
  };

  const handleSalonTypeChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData({ ...formData, salonType: selectedValues });
  };


  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, coverImage: file });
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    setGalleryPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString(),
            },
          }));
        },
        (error) => alert("Unable to retrieve your location.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authData = localStorage.getItem("auth");
    const auth = authData ? JSON.parse(authData) : null;
    const userId = auth?.user?._id;

    try {
      setIsSubmitting(true);

      const payload = new FormData();

      // Append form fields
      Object.keys(formData).forEach((key) => {
        if (key === "images" && formData.images) {
          formData.images.forEach((file) => payload.append("images", file));
        } else if (key === "coverImage" && formData.coverImage instanceof File) {
          payload.append("coverImage", formData.coverImage);
        } else if (key === "location") {
          payload.append("latitude", formData.location.latitude);
          payload.append("longitude", formData.location.longitude);
        } else {
          payload.append(key, formData[key]);
        }
      });

      // Append stylists and services as JSON strings
      payload.append("stylists", JSON.stringify(stylists));
      payload.append("services", JSON.stringify(services));

      await axios.put(
        `${process.env.REACT_APP_API}api/salon/update-salon-profile/${userId}`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      alert("Salon profile updated successfully!");
    } catch (error) {
      console.error("Error updating salon profile:", error);
      alert("Failed to update salon profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SalonLayout>
      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white text-center">
            <h2 className="text-white">Edit Salon Profile</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Salon Name */}
              <div className="form-group">
                <label htmlFor="name" className="font-weight-bold">Salon Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter salon name"
                  required
                />
              </div>

              {/* Salon Description */}
              <div className="form-group">
                <label htmlFor="description" className="font-weight-bold">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="3"
                  placeholder="Briefly describe your salon"
                  required
                />
              </div>

              {/* About Salon */}
              <div className="form-group">
                <label htmlFor="about" className="font-weight-bold">About</label>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="3"
                  placeholder="Tell more about your salon"
                />
              </div>

              {/* Address */}
              <div className="form-group">
                <label htmlFor="address" className="font-weight-bold">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter salon address"
                />
              </div>

              {/* City */}
              <div className="form-group">
                <label htmlFor="city" className="font-weight-bold">City</label>
                <Select
                  id="city"
                  options={cityOptions}
                  value={cityOptions.find(option => option.value === formData.city)}
                  onChange={handleCityChange}
                  className="form-control p-0"
                />
              </div>

              {/* Salon Type */}
              {formData.salonType && salonTypeOptions && (
                <Select
                  id="salonType"
                  isMulti
                  options={salonTypeOptions}
                  value={salonTypeOptions.filter((option) =>
                    formData.salonType.includes(option.value)
                  )}
                  onChange={handleSalonTypeChange}
                  className="form-control"
                  placeholder="Select salon types"
                />
              )}



              {/* Location */}
              <div className="form-group">
                <label className="font-weight-bold">Location</label>
                <div className="d-flex align-items-center">
                  <button type="button" onClick={handleGetLocation} className="btn btn-secondary mr-3">
                    Get Current Location
                  </button>
                  <div>
                    <small className="d-block">Latitude: {formData.location.latitude || "N/A"}</small>
                    <small className="d-block">Longitude: {formData.location.longitude || "N/A"}</small>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="form-group">
                <label htmlFor="coverImage" className="font-weight-bold">Cover Image</label>
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="form-control-file"
                />
                {coverPreview && (
                  <div className="mt-3">
                    <img src={coverPreview} alt="Cover Preview" className="img-thumbnail" width="300" />
                  </div>
                )}
              </div>

              {/* Gallery Images */}
              <div className="form-group">
                <label htmlFor="galleryImages" className="font-weight-bold">Gallery Images</label>
                <input
                  type="file"
                  id="galleryImages"
                  name="images"
                  accept="image/*"
                  onChange={handleGalleryChange}
                  className="form-control-file"
                  multiple
                />
                <div className="mt-3 d-flex flex-wrap">
                  {galleryPreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Gallery Preview ${index}`}
                      className="img-thumbnail mr-2 mb-2"
                      width="100"
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button type="submit" className="btn btn-primary px-5" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SalonLayout>

  );

};

export default EditSalonProfile;
