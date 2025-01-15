// src/pages/CreateSalon.js
import React, { useState, useEffect } from "react";
import { Offcanvas } from "bootstrap"; // Bootstrap Offcanvas import
import SalonLayout from "../../../../components/SalonLayout/SalonLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Ensure Bootstrap JS is loaded
import "./CreateSalon.css";
import Select from "react-select";
import axios from "axios";
const CreateSalon = () => {
  const [salonInfo, setSalonInfo] = useState({
    name: "",
    address: "",
    phone: "",
    about: "",
    description: "",
    city: "",
    salonType: [],
    latitude: "",
    longitude: "",
    coverImage: null,
    galleryImages: [],
  });

  const [coverPreview, setCoverPreview] = useState(null); // Cover image preview
  const [galleryPreviews, setGalleryPreviews] = useState([]); // Gallery images preview

  const [services, setServices] = useState([]);
  const [isSalonCreated, setIsSalonCreated] = useState(false);

  useEffect(() => {
    // Check if salon profile already created on component mount

    const salonExists = localStorage.getItem("salonCreated") === "true";
    if (salonExists) {
      setIsSalonCreated(true); // Disable submit button if flag exists
    }
  }, []);

  useEffect(() => {
    const initializeOffcanvas = (id) => {
      const element = document.getElementById(id);
      if (element) new Offcanvas(element);
    };

    initializeOffcanvas("stylistOffcanvas");
    initializeOffcanvas("serviceOffcanvas");
  }, []);

  const handleSalonChange = (e) => {
    const { name, value } = e.target;
    setSalonInfo({ ...salonInfo, [name]: value });
  };

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
    { value: "Peshawar", label: "Peshawar" },
    { value: "Multan", label: "Multan" },
    { value: "Quetta", label: "Quetta" },
    { value: "Sialkot", label: "Sialkot" },
    { value: "Gujranwala", label: "Gujranwala" },
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Bahawalpur", label: "Bahawalpur" },
    { value: "Sargodha", label: "Sargodha" },
    { value: "Sukkur", label: "Sukkur" },
    { value: "Larkana", label: "Larkana" },
    { value: "Mardan", label: "Mardan" },
    { value: "Mingora", label: "Mingora" },
    { value: "Nawabshah", label: "Nawabshah" },
    { value: "Chiniot", label: "Chiniot" },
    { value: "Jhang", label: "Jhang" },
    { value: "Dera Ghazi Khan", label: "Dera Ghazi Khan" },
    { value: "Mirpur Khas", label: "Mirpur Khas" },
    { value: "Kasur", label: "Kasur" },
    { value: "Vehari", label: "Vehari" },
    { value: "Sheikhupura", label: "Sheikhupura" },
    { value: "Kohat", label: "Kohat" },
    { value: "Abbottabad", label: "Abbottabad" },
    { value: "Turbat", label: "Turbat" },
    { value: "Jhelum", label: "Jhelum" },
    { value: "Mansehra", label: "Mansehra" },
    { value: "Dadu", label: "Dadu" },
    { value: "Khuzdar", label: "Khuzdar" },
    { value: "Mandi Bahauddin", label: "Mandi Bahauddin" },
    { value: "Pakpattan", label: "Pakpattan" },
    { value: "Bannu", label: "Bannu" },
    { value: "Gujrat", label: "Gujrat" },
    { value: "Khanewal", label: "Khanewal" },
    { value: "Charsadda", label: "Charsadda" },
  ];

  const handleCityChange = (selectedOption) => {
    const cityValue = selectedOption ? selectedOption.value : "";
    console.log("Selected City:", cityValue); // Debugging
    setSalonInfo({
      ...salonInfo,
      city: cityValue,
    });
  };

  const handleSalonTypeChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSalonInfo((prev) => ({ ...prev, salonType: selectedValues }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSalonInfo({ ...salonInfo, coverImage: file });
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setSalonInfo({ ...salonInfo, galleryImages: files });
    setGalleryPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSalonInfo((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
        },
        (error) => alert("Unable to retrieve your location.")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // State initialization for the new stylist ................................................
  const [stylists, setStylists] = useState([]);
  const [newStylist, setNewStylist] = useState({
    name: "",
    experience: "",
    expertise: "",
    about: "",
    dateTimeSlots: [{ date: "", times: [] }], // Ensure proper initialization
  });
  

  // Function to add a new date-time slot
  const addDateTimeSlot = () => {
    setNewStylist((prev) => ({
      ...prev,
      dateTimeSlots: [...prev.dateTimeSlots, { date: "", times: [] }],
    }));
  };

  // Handle individual date change for a specific slot
  const handleDateChange = (index, e) => {
    const updatedSlots = [...newStylist.dateTimeSlots];
    updatedSlots[index].date = e.target.value;
    setNewStylist((prev) => ({
      ...prev,
      dateTimeSlots: updatedSlots,
    }));
  };

  // Handle time input for a specific slot as comma-separated values
  const handleTimeChange = (index, e) => {
    const times = e.target.value.split(",").map((time) => time.trim());
    const updatedSlots = [...newStylist.dateTimeSlots];
    updatedSlots[index].times = times;
    setNewStylist((prev) => ({
      ...prev,
      dateTimeSlots: updatedSlots,
    }));
  };

  const removeDateTimeSlot = (index) => {
    const updatedSlots = newStylist.dateTimeSlots.filter((_, i) => i !== index);
    setNewStylist((prev) => ({
      ...prev,
      dateTimeSlots: updatedSlots,
    }));
  };

  const addStylist = () => {
    if (
      !newStylist.name ||
      !newStylist.experience ||
      !newStylist.expertise ||
      !newStylist.about ||
      newStylist.dateTimeSlots.some((slot) => !slot.date) // Only check if the date is missing
    ) {
      alert(
        "Please fill out all fields for the stylist, including valid dates."
      );
      return;
    }
  
    setStylists([...stylists, newStylist]);
  
    // Reset the newStylist state
    setNewStylist({
      name: "",
      experience: "",
      expertise: "",
      about: "",
      dateTimeSlots: [{ date: "", times: [] }],
    });
  
    alert("Stylist added successfully!");
  };
  

  const handleStylistChange = (e) => {
    const { name, value } = e.target;
    setNewStylist({ ...newStylist, [name]: value });
  };

  // .............................. about service canvas
  // Updated state for newService...........................................
  const [newService, setNewService] = useState({
    type: "",
    options: [], // Store options as an array of {name, price}
  });

  const addOption = () => {
    if (!newService.name || !newService.price) {
      alert("Please enter both a service name and price.");
      return;
    }

    // Add the new option to the options array
    setNewService((prev) => ({
      ...prev,
      options: [
        ...prev.options,
        { name: newService.name, price: newService.price },
      ],
      name: "", // Reset name field
      price: "", // Reset price field
    }));
  };

  const addService = () => {
    if (!newService.type || newService.options.length === 0) {
      alert(
        "Please select a service type and provide  options.Also Click Add Option Button"
      );
      return;
    }

    setServices((prev) => [...prev, newService]); // Add the service to the list

    // Reset the newService state
    setNewService({ type: "", options: [] });

    alert("Service added successfully!");
  };

  // .........................................submission work..................................

  const formatSalonPayload = (salonInfo, stylists, services) => {
    const formData = new FormData();

    // Append all text fields
    formData.append("name", salonInfo.name);
    formData.append("city", salonInfo.city);
    formData.append("about", salonInfo.about);
    formData.append("address", salonInfo.address);
    formData.append("description", salonInfo.description);
    formData.append("latitude", salonInfo.latitude);
    formData.append("longitude", salonInfo.longitude);

    // Append array values
    salonInfo.salonType.forEach((type) => formData.append("salonType[]", type));

    // Append stylists as a JSON string
    formData.append("stylists", JSON.stringify(stylists));

    // Append services as a JSON string
    formData.append("services", JSON.stringify(services));

    // Append files: cover image
    if (salonInfo.coverImage) {
      formData.append("coverImage", salonInfo.coverImage);
    }

    // Append gallery images
    salonInfo.galleryImages.forEach((image) => {
      formData.append("images", image);
    });

    return formData;
  };

  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  //Handle Submit Method Here if need reset Feilds after Submition.....
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (stylists.length === 0) {
  //       alert("Please add at least one stylist.");
  //       return;
  //     }

  //     if (services.length === 0) {
  //       alert("Please add at least one service.");
  //       return;
  //     }

  //     try {
  //       setIsSubmitting(true); // Disable submit button during submission

  //       // Prepare the FormData payload
  //       const formData = formatSalonPayload(salonInfo, stylists, services);
  //       console.log("FormData:", formData); // Debugging

  //       const response = await axios.post(
  //         `${process.env.REACT_APP_API}api/salon/create-salon-profile`,
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       console.log("Salon created successfully:", response.data);
  //       alert("Salon profile created successfully!");

  //       // Clear the input fields by resetting state
  //       setSalonInfo({
  //         name: "",
  //         address: "",
  //         phone: "",
  //         about: "",
  //         description: "",
  //         city: "",
  //         salonType: [],
  //         latitude: "",
  //         longitude: "",
  //         coverImage: null,
  //         galleryImages: [],
  //       });

  //       setStylists([]); // Clear stylists
  //       setServices([]); // Clear services

  //       setIsSalonCreated(true); // Set created flag
  //       localStorage.setItem("salonCreated", "true");
  //     } catch (error) {
  //       console.error("Error creating salon profile:", error);
  //       alert(`Failed to create salon profile: ${error.message}`);
  //     } finally {
  //       setIsSubmitting(false); // Re-enable button if there is an error
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (stylists.length === 0) {
      alert("Please add at least one stylist.");
      return;
    }

    if (services.length === 0) {
      alert("Please add at least one service.");
      return;
    }

    try {
      setIsSubmitting(true); // Disable submit button during submission

      // Prepare the FormData payload
      const formData = formatSalonPayload(salonInfo, stylists, services);
      console.log("FormData:", formData); // Debugging

      // Retrieve and parse the token
      const authData = localStorage.getItem("auth");
      const auth = authData ? JSON.parse(authData) : null;
      const token = auth?.token;

      const response = await axios.post(
        `${process.env.REACT_APP_API}api/salon/create-salon-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Salon created successfully:", response.data);
      alert("Salon profile created successfully!");
      // Set flag in localStorage
      localStorage.setItem("salonCreated", "true");
      setIsSalonCreated(true); // Disable the submit button
    } catch (error) {
      console.error("Error creating salon profile:", error);
      alert(`Failed to create salon profile: ${error.message}`);
      setIsSubmitting(false); // Re-enable button if there is an error
    }
  };

  return (
    <SalonLayout>
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Open Your Salon Here</h1>

        <form onSubmit={handleSubmit}>
          <div className="card mb-4">
            <div className="card-header">Salon Information</div>
            <div className="card-body">
              <input
                type="text"
                className="form-control mb-3"
                name="name"
                placeholder="Salon Name"
                value={salonInfo.name}
                onChange={handleSalonChange}
                required
              />
              <input
                type="text"
                className="form-control mb-3"
                name="address"
                placeholder="Address"
                value={salonInfo.address}
                onChange={handleSalonChange}
                required
              />

              <div className="mb-3">
                <label className="form-label">City</label>
                <Select
                  options={cityOptions} // City options list
                  isClearable // Enables the cross button to clear the selected option
                  value={cityOptions.find(
                    (option) => option.value === salonInfo.city
                  )}
                  onChange={handleCityChange} // Handles city change
                  placeholder="Select a city"
                />
              </div>

              <input
                type="tel"
                className="form-control mb-3"
                name="phone"
                placeholder="Phone Number"
                value={salonInfo.phone}
                onChange={handleSalonChange}
                required
              />

              <input
                type="text"
                className="form-control mb-3"
                name="about"
                placeholder="About Salon"
                value={salonInfo.about}
                onChange={handleSalonChange}
                required
              />

              <textarea
                className="form-control mb-3"
                name="description"
                rows="3"
                placeholder="Description"
                value={salonInfo.description}
                onChange={handleSalonChange}
                required
              />
              <div className="mb-3">
                <label className="form-label">Salon Type</label>
                <Select
                  options={salonTypeOptions}
                  isMulti
                  onChange={handleSalonTypeChange}
                  value={salonTypeOptions.filter((option) =>
                    salonInfo.salonType.includes(option.value)
                  )}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="latitude"
                    placeholder="Latitude"
                    value={salonInfo.latitude}
                    readOnly
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="longitude"
                    placeholder="Longitude"
                    value={salonInfo.longitude}
                    readOnly
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn btn-info mb-3"
                onClick={handleGetLocation}
              >
                Get Current Location
              </button>

              <div className="mb-3">
                <label className="form-label">Cover Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleCoverImageChange}
                  required
                />
                {coverPreview && (
                  <img
                    src={coverPreview}
                    alt="Cover Preview"
                    className="img-thumbnail mt-2"
                    style={{ width: "150px", height: "150px" }}
                  />
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Gallery Images</label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={handleGalleryImagesChange}
                />
                <div className="row mt-2">
                  {galleryPreviews.map((src, index) => (
                    <div key={index} className="col-6 col-md-3">
                      <img
                        src={src}
                        alt={`Gallery Preview ${index}`}
                        className="img-thumbnail"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mb-4">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="offcanvas"
              data-bs-target="#stylistOffcanvas"
            >
              Add Stylist
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-toggle="offcanvas"
              data-bs-target="#serviceOffcanvas"
            >
              Add Service
            </button>
          </div>

          {!isSalonCreated ? (
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Salon"}
            </button>
          ) : (
            <div className="alert alert-info mt-3">
              Salon profile created successfully. Now! You can edit your
              profile.In Edit Salon Section Thanks.
            </div>
          )}
        </form>

        {/* Offcanvas for Stylist */}
        <div
          className="offcanvas offcanvas-end"
          id="stylistOffcanvas"
          aria-labelledby="stylistOffcanvasLabel"
        >
          <div className="offcanvas-header">
            <h5 id="stylistOffcanvasLabel">Add Stylist</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body">
            <input
              type="text"
              className="form-control mb-3"
              name="name"
              placeholder="Stylist Name"
              value={newStylist.name}
              onChange={handleStylistChange}
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              name="experience"
              placeholder="Experience (e.g., 5 years)"
              value={newStylist.experience}
              onChange={handleStylistChange}
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              name="expertise"
              placeholder="Expertise (e.g., Haircut, Spa)"
              value={newStylist.expertise}
              onChange={handleStylistChange}
              required
            />

            <textarea
              className="form-control mb-3"
              name="about"
              placeholder="About the Stylist"
              rows="3"
              value={newStylist.about}
              onChange={handleStylistChange}
              required
            />

            {/* Date-Time Slot Management */}
            <div className="mb-3">
              <button
                className="btn btn-secondary mb-3"
                type="button"
                onClick={addDateTimeSlot}
              >
                Add Date-Time Slot
              </button>

              {newStylist.dateTimeSlots.map((slot, index) => (
                <div key={index} className="border p-3 mb-2 rounded">
                  <div className="mb-2">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={slot.date}
                      onChange={(e) => handleDateChange(index, e)}
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Times</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter times separated by commas (e.g., 10:00, 14:00)"
                      value={slot.times ? slot.times.join(", ") : ""}
                      onChange={(e) => handleTimeChange(index, e)}
                      required
                    />
                  </div>

                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => removeDateTimeSlot(index)}
                  >
                    Remove Slot
                  </button>
                </div>
              ))}
            </div>

            <button className="btn btn-primary w-100 mt-3" onClick={addStylist}>
              Add Stylist
            </button>
          </div>
        </div>

        {/* Offcanvas for Service */}
        <div
          className="offcanvas offcanvas-end"
          id="serviceOffcanvas"
          aria-labelledby="serviceOffcanvasLabel"
        >
          <div className="offcanvas-header">
            <h5 id="serviceOffcanvasLabel">Add Service</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body">
            {/* Select Salon Type */}
            <div className="mb-3">
              <label className="form-label">Select Your Service Category</label>
              <Select
                options={salonTypeOptions}
                value={salonTypeOptions.find(
                  (option) => option.value === newService.type
                )}
                onChange={(selectedOption) =>
                  setNewService((prev) => ({
                    ...prev,
                    type: selectedOption?.value || "",
                  }))
                }
                className="basic-select"
                classNamePrefix="select"
                placeholder="Select a category"
              />
            </div>

            {/* Service Name Input */}
            <div className="mb-3">
              <label className="form-label">Service Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter service name"
                value={newService.name || ""}
                onChange={(e) =>
                  setNewService((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            {/* Service Price Input */}
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter price"
                value={newService.price || ""}
                onChange={(e) =>
                  setNewService((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            </div>

            {/* Add Option Button */}
            <button className="btn btn-secondary mb-3" onClick={addOption}>
              Add Option
            </button>

            {/* Display Added Options */}
            <ul className="list-group">
              {newService.options.map((option, index) => (
                <li key={index} className="list-group-item">
                  {option.name} - ${option.price}
                </li>
              ))}
            </ul>

            {/* Add Service Button */}
            <button className="btn btn-primary w-100 mt-3" onClick={addService}>
              Add Service
            </button>
          </div>
        </div>
      </div>
    </SalonLayout>
  );
};

export default CreateSalon;
