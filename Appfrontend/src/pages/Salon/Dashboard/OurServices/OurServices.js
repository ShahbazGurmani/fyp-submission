import React, { useState, useEffect } from "react";
import axios from "axios";
import SalonLayout from "../../../../components/SalonLayout/SalonLayout";

const OurServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [addingNewService, setAddingNewService] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    options: [{ name: "", price: "" }],
  });

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const authData = localStorage.getItem("auth");
        const auth = authData ? JSON.parse(authData) : null;
        const userId = auth?.user?._id;

        const response = await axios.get(
          `${process.env.REACT_APP_API}api/salon/edit-salon/${userId}`
        );

        setServices(response.data.salonProfile.services || []);
      } catch (error) {
        console.error("Error fetching service data:", error);
        alert("Failed to fetch service data.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, dataset } = e.target;

    if (name === "name" || name === "price") {
      const updatedOptions = [...formData.options];
      updatedOptions[dataset.index][name] = value;
      setFormData({ ...formData, options: updatedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, { name: "", price: "" }],
    });
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = formData.options.filter((_, idx) => idx !== index);
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleEdit = (service) => {
    setEditingService(service._id);
    setFormData({
      type: service.type,
      options: service.options || [{ name: "", price: "" }],
    });
  };

  const handleCancel = () => {
    setEditingService(null);
    setAddingNewService(false);
    setFormData({
      type: "",
      options: [{ name: "", price: "" }],
    });
  };

  const handleAddNewService = async () => {
    if (!formData.type.trim()) {
      alert("Service type cannot be empty.");
      return;
    }
    if (formData.options.some((option) => isNaN(option.price) || option.price.trim() === "")) {
      alert("Please enter valid prices for all options.");
      return;
    }

    try {
      setIsSubmitting(true);
      const authData = localStorage.getItem("auth");
      const auth = authData ? JSON.parse(authData) : null;
      const userId = auth?.user?._id;

      const newService = { ...formData };

      await axios.put(
        `${process.env.REACT_APP_API}api/salon/update-salon-profile/${userId}`,
        { services: [...services, newService] },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      setServices((prevServices) => [...prevServices, newService]);
      alert("Service added successfully!");
      handleCancel();
    } catch (error) {
      console.error("Error adding new service:", error);
      alert("Failed to add new service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingService) return;

    if (!formData.type.trim()) {
      alert("Service type cannot be empty.");
      return;
    }
    if (formData.options.some((option) => isNaN(option.price) || option.price.trim() === "")) {
      alert("Please enter valid prices for all options.");
      return;
    }

    try {
      setIsSubmitting(true);
      const authData = localStorage.getItem("auth");
      const auth = authData ? JSON.parse(authData) : null;
      const userId = auth?.user?._id;

      const updatedServices = services.map((service) =>
        service._id === editingService ? { ...service, ...formData } : service
      );

      await axios.put(
        `${process.env.REACT_APP_API}api/salon/update-salon-profile/${userId}`,
        { services: updatedServices },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      setServices(updatedServices);
      alert("Service updated successfully!");
      handleCancel();
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveService = async (serviceId) => {
    if (window.confirm("Are you sure you want to remove this service?")) {
      try {
        setIsSubmitting(true);
        const authData = localStorage.getItem("auth");
        const auth = authData ? JSON.parse(authData) : null;
        const userId = auth?.user?._id;

        await axios.put(
          `${process.env.REACT_APP_API}api/salon/update-salon-profile/${userId}`,
          { services: services.filter((service) => service._id !== serviceId) },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        setServices((prevServices) => prevServices.filter((service) => service._id !== serviceId));
        alert("Service removed successfully!");
      } catch (error) {
        console.error("Error removing service:", error);
        alert("Failed to remove service. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <SalonLayout>
      <div className="container mt-5">
        <h2 className="text-center">Our Services</h2>

        <button className="btn btn-success mb-4" onClick={() => setAddingNewService(true)}>
          Add New Service
        </button>

        <div className="list-group">
          {services.map((service) => (
            <div key={service._id} className="list-group-item">
              <h4>{service.type}</h4>
              <ul>
                {service.options.map((option, index) => (
                  <li key={index}>
                    {option.name}: ${option.price}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary btn-sm" onClick={() => handleEdit(service)}>
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => handleRemoveService(service._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {(editingService || addingNewService) && (
          <div className="mt-4">
            <h3>{addingNewService ? "Add New Service" : "Edit Service"}</h3>
            <form>
              <div className="mb-3">
                <label>Service Type</label>
                <input
                  type="text"
                  name="type"
                  className="form-control"
                  value={formData.type}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label>Service Options</label>
                {formData.options.map((option, index) => (
                  <div key={index} className="d-flex mb-2">
                    <input
                      type="text"
                      name="name"
                      data-index={index}
                      className="form-control me-2"
                      placeholder="Option Name"
                      value={option.name}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="price"
                      data-index={index}
                      className="form-control me-2"
                      placeholder="Price"
                      value={option.price}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveOption(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddOption}>
                  Add Option
                </button>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addingNewService ? handleAddNewService : handleUpdate}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : addingNewService ? "Add Service" : "Update Service"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </SalonLayout>
  );
};

export default OurServices;
