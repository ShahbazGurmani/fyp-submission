import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SalonLayout from "../../../../components/SalonLayout/SalonLayout";
import './SalonSetting.css';
import { useAuth } from "../../../../context/Auth";

const SalonSetting = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const navigate = useNavigate(); // Use useNavigate here to navigate throughout the component
  const [auth, setAuth] = useAuth();

  // Retrieve userId from localStorage
  const authData = localStorage.getItem("auth");
  const authdetail = authData ? JSON.parse(authData) : null;
  const userId = authdetail?.user?._id;

  // Show modal for delete confirmation
  const handleDeleteClick = () => {
    setShowModal(true);
  };

  // Hide modal
  const handleCloseModal = () => {
    setShowModal(false);
    setError('');
    setEmail('');
    setPassword('');
    setDeleteConfirmation(false);
  };

  


  // Handle initial delete request
  const handleDeleteAccount = async () => {

   
      

    if (email && password) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}api/auth/login`,
          { email, password }
        );

       

        if (response.data.success) {
          setDeleteConfirmation(true);  // Proceed to second confirmation
        } else {
          setError('Email or password is incorrect.');
        }
      } catch (err) {
        setError('Error verifying credentials. Please try again.');
      }
    } else {
      setError('Please enter both email and password.');
    }
  };

  // Handle final deletion of the account
  const handleFinalDelete = async () => {
    if (!userId) {
      console.error("User ID not found in localStorage");
      return; // Exit if no userId found
    }

    console.log("Deleting account for userId:", userId);

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API}api/salon/delete-salon/${userId}`
      );

      if (response.data.success) {
        alert('Account deleted successfully');
        setAuth({
            user: null,
            token: "",
          });
          localStorage.removeItem("auth");
          localStorage.setItem("bannerDismissed", JSON.stringify(false)); // Store as "false" (string)
          localStorage.removeItem("salonCreated");
        navigate('/'); // Redirect to homepage after deletion
      } else {
        alert('Error deleting account. Please try again.');
      }
    } catch (error) {
      console.error("Error deleting salon account:", error);
      alert('An error occurred while deleting the account.');
    }
  };

  return (
    <SalonLayout>
      <div className="salon-setting">
        <h2>Salon Settings</h2>

        {/* Delete Confirmation and Motivational Points */}
        <div className="setting-points">
          <h3>Relax, Take a Deep Breath</h3>
          <p>We know that managing a salon can be challenging, but we believe you can overcome any obstacle. Before you take the final step, let's remind you of a few things:</p>

          <div className="motivational-points">
            <ul>
              <li><strong>Every Challenge is an Opportunity:</strong> Every setback you face is a learning experience that helps you grow as a business owner.</li>
              <li><strong>Success is a Journey:</strong> Your journey in the salon industry has its ups and downs, but every day is a chance to improve and achieve greatness.</li>
              <li><strong>You Are Not Alone:</strong> There is a whole community of salon owners who have faced similar struggles and found ways to thrive.</li>
              <li><strong>It’s Okay to Pause:</strong> If you feel like you're not sure, it's okay to take a break and reevaluate. Sometimes stepping back gives you fresh perspective.</li>
              <li><strong>Growth Comes with Patience:</strong> Growth may take time, but every step you take brings you closer to achieving your goals.</li>
            </ul>
          </div>

          <p>We’re here to help you, no matter your decision. If you choose to move forward with deleting your account, we’ll make sure it’s done with care.</p>

          <button className="btn btn-danger" onClick={handleDeleteClick}>Delete Salon Account</button>
        </div>
      </div>

      {/* Modal for delete confirmation */}
      {showModal && !deleteConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Are you sure you want to delete your salon account?</h4>
            <p>This action cannot be undone.</p>

            <div className="input-group">
              <label htmlFor="email">Enter your email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Enter your password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              <button className="btn btn-danger" onClick={handleDeleteAccount}>Yes, Delete My Account</button>
            </div>
          </div>
        </div>
      )}

      {/* Final confirmation to delete permanently */}
      {showModal && deleteConfirmation && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Are you sure you want to permanently delete your salon account?</h4>
            <p>This will remove your salon profile forever. This action cannot be undone.</p>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              <button className="btn btn-danger" onClick={handleFinalDelete}>Yes, Permanently Delete</button>
            </div>
          </div>
        </div>
      )}
    </SalonLayout>
  );
};

export default SalonSetting;
