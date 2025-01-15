import React, { useState, useEffect } from "react";
import axios from "axios";
import SalonLayout from "../../../../components/SalonLayout/SalonLayout";

const OurTeam = () => {
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingStylist, setEditingStylist] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    expertise: "",
    about: "",
    dateTimeSlots: [], // Date and time slots management
  });

  const [newDate, setNewDate] = useState("");
  const [newTimeSlot, setNewTimeSlot] = useState("");
  const [copyDate, setCopyDate] = useState(""); // Date to copy times to
  const [isAddingNewStylist, setIsAddingNewStylist] = useState(false);

  // Fetch stylist data
  useEffect(() => {
    const fetchStylists = async () => {
      setLoading(true);
      try {
        const authData = localStorage.getItem("auth");
        const auth = authData ? JSON.parse(authData) : null;
        const userId = auth?.user?._id;

        const response = await axios.get(
          `${process.env.REACT_APP_API}api/salon/edit-salon/${userId}`
        );

        setStylists(response.data.salonProfile.stylists || []);
      } catch (error) {
        console.error("Error fetching stylist data:", error);
        alert("Failed to fetch stylist data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStylists();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle adding multiple time slots to a specific date
  const handleAddSlot = () => {
    if (newTimeSlot.trim() && newDate) {
      const updatedDateTimeSlots = formData.dateTimeSlots.map((slot) => {
        if (slot.date === newDate) {
          return {
            ...slot,
            times: [...slot.times, newTimeSlot.trim()],
          };
        }
        return slot;
      });

      if (!updatedDateTimeSlots.find((slot) => slot.date === newDate)) {
        updatedDateTimeSlots.push({
          date: newDate,
          times: [newTimeSlot.trim()],
        });
      }

      setFormData({ ...formData, dateTimeSlots: updatedDateTimeSlots });
      setNewTimeSlot(""); // Clear the time slot input
    }
  };

  // Handle removing a time slot from a specific date
  const handleRemoveSlot = (date, time) => {
    const updatedDateTimeSlots = formData.dateTimeSlots
      .map((slot) => {
        if (slot.date === date) {
          const updatedTimes = slot.times.filter((t) => t !== time);
          if (updatedTimes.length === 0) {
            return null; // Remove the date entirely if no times remain
          }
          return {
            ...slot,
            times: updatedTimes,
          };
        }
        return slot;
      })
      .filter(Boolean); // Filter out null values (dates with no times)

    setFormData({ ...formData, dateTimeSlots: updatedDateTimeSlots });
  };

  // Copy times from one day to another
  const handleCopyTimes = () => {
    if (!copyDate) return;

    const copyTimes = formData.dateTimeSlots.find(
      (slot) => slot.date === newDate
    )?.times || [];

    if (copyTimes.length === 0) {
      alert("No times available to copy.");
      return;
    }

    const updatedDateTimeSlots = formData.dateTimeSlots.map((slot) => {
      if (slot.date === copyDate) {
        return {
          ...slot,
          times: [...slot.times, ...copyTimes],
        };
      }
      return slot;
    });

    if (!updatedDateTimeSlots.find((slot) => slot.date === copyDate)) {
      updatedDateTimeSlots.push({
        date: copyDate,
        times: [...copyTimes],
      });
    }

    setFormData({ ...formData, dateTimeSlots: updatedDateTimeSlots });
  };

  // Start editing a stylist
  const handleEdit = (stylist) => {
    setEditingStylist(stylist._id);
    setFormData({
      name: stylist.name,
      experience: stylist.experience,
      expertise: stylist.expertise,
      about: stylist.about,
      dateTimeSlots: stylist.dateTimeSlots || [],
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingStylist(null);
    setFormData({
      name: "",
      experience: "",
      expertise: "",
      about: "",
      dateTimeSlots: [],
    });
  };

  // Update stylist data
  const handleUpdate = async () => {
    if (!editingStylist) return;

    try {
      setIsSubmitting(true);
      const authData = localStorage.getItem("auth");
      const auth = authData ? JSON.parse(authData) : null;
      const userId = auth?.user?._id;

      const updatedStylists = stylists.map((stylist) =>
        stylist._id === editingStylist
          ? { ...stylist, ...formData }
          : stylist
      );

      await axios.put(
        `${process.env.REACT_APP_API}api/salon/update-salon-profile/${userId}`,
        { stylists: updatedStylists },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      setStylists(updatedStylists); // Update UI after successful API call
      alert("Stylist updated successfully!");
      handleCancel(); // Reset editing state
    } catch (error) {
      console.error("Error updating stylist:", error);
      alert("Failed to update stylist. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Remove Stylist function (added)
  const handleRemoveStylist = async (stylistId) => {
    if (window.confirm("Are you sure you want to remove this stylist?")) {
      try {
        const authData = localStorage.getItem("auth");
        const auth = authData ? JSON.parse(authData) : null;
        const userId = auth?.user?._id;

        const updatedStylists = stylists.filter((stylist) => stylist._id !== stylistId);

        await axios.put(
          `${process.env.REACT_APP_API}api/salon/update-salon-profile/${userId}`,
          { stylists: updatedStylists },
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        setStylists(updatedStylists); // Update UI after successful API call
        alert("Stylist removed successfully!");
      } catch (error) {
        console.error("Error removing stylist:", error);
        alert("Failed to remove stylist. Please try again.");
      }
    }
  };


    // Handle adding a new stylist
    const [newStylistFormData, setNewStylistFormData] = useState({
        name: "",
        experience: "",
        expertise: "",
        about: "",
        dateTimeSlots: [], // Date and time slots for the new stylist
      });
      
      const [newStylistDate, setNewStylistDate] = useState("");
      const [newStylistTimeSlot, setNewStylistTimeSlot] = useState("");
      
      // Handle input change for new stylist form
      const handleNewStylistInputChange = (e) => {
        const { name, value } = e.target;
        setNewStylistFormData({ ...newStylistFormData, [name]: value });
      };
      
      // Handle adding time slots for the new stylist
      const handleAddNewStylistSlot = () => {
        if (newStylistTimeSlot.trim() && newStylistDate) {
          const updatedDateTimeSlots = newStylistFormData.dateTimeSlots.map((slot) => {
            if (slot.date === newStylistDate) {
              return {
                ...slot,
                times: [...slot.times, newStylistTimeSlot.trim()],
              };
            }
            return slot;
          });
      
          if (!updatedDateTimeSlots.find((slot) => slot.date === newStylistDate)) {
            updatedDateTimeSlots.push({
              date: newStylistDate,
              times: [newStylistTimeSlot.trim()],
            });
          }
      
          setNewStylistFormData({ ...newStylistFormData, dateTimeSlots: updatedDateTimeSlots });
          setNewStylistTimeSlot(""); // Clear the time slot input
        }
      };
      
      // Handle removing a time slot for the new stylist
      const handleRemoveNewStylistSlot = (date, time) => {
        const updatedDateTimeSlots = newStylistFormData.dateTimeSlots
          .map((slot) => {
            if (slot.date === date) {
              const updatedTimes = slot.times.filter((t) => t !== time);
              if (updatedTimes.length === 0) {
                return null; // Remove the date entirely if no times remain
              }
              return {
                ...slot,
                times: updatedTimes,
              };
            }
            return slot;
          })
          .filter(Boolean); // Filter out null values (dates with no times)
      
        setNewStylistFormData({ ...newStylistFormData, dateTimeSlots: updatedDateTimeSlots });
      };
      
      // Handle form submission for adding the new stylist
      const handleAddNewStylist = async () => {
        if (!newStylistFormData.name.trim()) {
          alert("Stylist name cannot be empty.");
          return;
        }
        if (!newStylistFormData.experience.trim()) {
          alert("Experience field cannot be empty.");
          return;
        }
        if (!newStylistFormData.expertise.trim()) {
          alert("Expertise field cannot be empty.");
          return;
        }
        if (!newStylistFormData.about.trim()) {
          alert("About field cannot be empty.");
          return;
        }
        if (newStylistFormData.dateTimeSlots.length === 0) {
          alert("Please add availability for the stylist.");
          return;
        }
      
        try {
          setIsSubmitting(true);
          const authData = localStorage.getItem("auth");
          const auth = authData ? JSON.parse(authData) : null;
          const userId = auth?.user?._id;
      
          const newStylist = { ...newStylistFormData };
      
          await axios.put(
            `${process.env.REACT_APP_API}api/salon/update-salon-profile/${userId}`,
            { stylists: [...stylists, newStylist] },
            {
              headers: {
                Authorization: `Bearer ${auth?.token}`,
              },
            }
          );
      
          setStylists((prevStylists) => [...prevStylists, newStylist]);
          alert("Stylist added successfully!");
          setNewStylistFormData({
            name: "",
            experience: "",
            expertise: "",
            about: "",
            dateTimeSlots: [],
          });
        } catch (error) {
          console.error("Error adding new stylist:", error);
          alert("Failed to add stylist. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      };
      
      
      // Handle cancel adding new stylist
      const handleCancelAddStylist = () => {
        setIsAddingNewStylist(false); // Hide the form
        setNewStylistFormData({
          name: "",
          experience: "",
          expertise: "",
          about: "",
          dateTimeSlots: [],
        }); // Reset the form data
        setNewStylistDate(""); // Reset the date input field
        setNewStylistTimeSlot(""); // Reset the time slot input field
      };
      



  if (loading) {
    return <div>Loading stylists...</div>;
  }

  return (
    <SalonLayout>
      <div className="container mt-5">
        <h2 className="text-center">Our Team</h2>
        <div className="mt-4">
         
          <button
            className="btn btn-success mb-3"
            onClick={() => setIsAddingNewStylist(true)}
          >
            Add New Stylist
          </button>

          {isAddingNewStylist && (
            <form>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={newStylistFormData.name}
                  onChange={(e) =>
                    setNewStylistFormData({
                      ...newStylistFormData,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label>Experience</label>
                <input
                  type="text"
                  name="experience"
                  className="form-control"
                  value={newStylistFormData.experience}
                  onChange={(e) =>
                    setNewStylistFormData({
                      ...newStylistFormData,
                      experience: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label>Expertise</label>
                <input
                  type="text"
                  name="expertise"
                  className="form-control"
                  value={newStylistFormData.expertise}
                  onChange={(e) =>
                    setNewStylistFormData({
                      ...newStylistFormData,
                      expertise: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label>About</label>
                <textarea
                  name="about"
                  className="form-control"
                  value={newStylistFormData.about}
                  onChange={(e) =>
                    setNewStylistFormData({
                      ...newStylistFormData,
                      about: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label>Availability</label>
                <div>
                  {newStylistFormData.dateTimeSlots.map((slot) => (
                    <div key={slot.date}>
                      <strong>{slot.date}</strong>:{" "}
                      {slot.times.map((time) => (
                        <span key={time} className="badge bg-secondary me-2">
                          {time}{" "}
                          <button
                            type="button"
                            className="btn-close btn-close-white ms-2"
                            aria-label="Remove"
                            onClick={() =>
                              handleRemoveNewStylistSlot(slot.date, time)
                            }
                          ></button>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="d-flex mt-2">
                  <input
                    type="date"
                    className="form-control me-2"
                    value={newStylistDate}
                    onChange={(e) => setNewStylistDate(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Add new time slot"
                    value={newStylistTimeSlot}
                    onChange={(e) => setNewStylistTimeSlot(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleAddNewStylistSlot}
                  >
                    Add Slot
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddNewStylist}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Stylist"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={handleCancelAddStylist}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
        
        
        <div className="list-group">
        <h3>List Of Member Work With you!</h3>
          {stylists.map((stylist) => (
            <div key={stylist._id} className="list-group-item">
              <h4>{stylist.name}</h4>
              <p>Experience: {stylist.experience}</p>
              <p>Expertise: {stylist.expertise}</p>
              <p>About: {stylist.about}</p>
              <p>
                Availability:{" "}
                {stylist.dateTimeSlots.length > 0
                  ? stylist.dateTimeSlots.map((slot) => (
                      <div key={slot.date}>
                        <strong>{slot.date}</strong>: {slot.times.join(", ")}
                      </div>
                    ))
                  : "No slots available"}
              </p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleEdit(stylist)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => handleRemoveStylist(stylist._id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {editingStylist && (
          <div className="mt-4">
            <h3>Edit Stylist</h3>
            <form>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label>Experience</label>
                <input
                  type="text"
                  name="experience"
                  className="form-control"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label>Expertise</label>
                <input
                  type="text"
                  name="expertise"
                  className="form-control"
                  value={formData.expertise}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label>About</label>
                <textarea
                  name="about"
                  className="form-control"
                  value={formData.about}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label>Availability</label>
                <div>
                  {formData.dateTimeSlots.map((slot) => (
                    <div key={slot.date}>
                      <strong>{slot.date}</strong>:{" "}
                      {slot.times.map((time) => (
                        <span key={time} className="badge bg-secondary me-2">
                          {time}{" "}
                          <button
                            type="button"
                            className="btn-close btn-close-white ms-2"
                            aria-label="Remove"
                            onClick={() => handleRemoveSlot(slot.date, time)}
                          ></button>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="d-flex mt-2">
                  <input
                    type="date"
                    className="form-control me-2"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Add new time slot"
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleAddSlot}
                  >
                    Add Slot
                  </button>
                </div>
                <div className="d-flex mt-2">
                  <input
                    type="date"
                    className="form-control me-2"
                    value={copyDate}
                    onChange={(e) => setCopyDate(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleCopyTimes}
                  >
                    Copy Times to Another Date
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Stylist"}
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

export default OurTeam;
