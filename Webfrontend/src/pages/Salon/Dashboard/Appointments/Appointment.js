import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SalonLayout from '../../../../components/SalonLayout/SalonLayout';

const SalonDashboard = () => {
  const [salonId, setSalonId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch the salon ID based on the user ID from localStorage
  useEffect(() => {
    const authData = localStorage.getItem('auth');
    const auth = authData ? JSON.parse(authData) : null;
    const userId = auth?.user?._id;

    if (!userId) {
      console.error('User ID not found in localStorage');
      setError('User not logged in');
      return;
    }

    const fetchSalonId = async () => {
      try {
        console.log(`Fetching salon data for user ID: ${userId}`);
        const response = await axios.get(
          `${process.env.REACT_APP_API}api/salon/view-salon/${userId}`
        );

        console.log('Salon data response:', response);

        if (response.data?.salonProfile) {
          setSalonId(response.data.salonProfile._id); 
        } else {
          console.error('Salon profile not found in response');
          setError('Salon profile not found');
        }
      } catch (error) {
        console.error('Error fetching salon data:', error);
        setError('Error fetching salon data');
      }
    };

    fetchSalonId();
  }, []);

  // Fetch appointments based on the salon ID
  useEffect(() => {
    if (salonId) {
      const fetchAppointments = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API}api/booking/salon-appointments/${salonId}`
          );
          if (response.data && Array.isArray(response.data)) {
            setAppointments(response.data);
            setFilteredAppointments(response.data);
          } else {
            setAppointments([]);
            setFilteredAppointments([]);
          }
        } catch (error) {
          console.error('Error fetching appointments:', error);
          setError('Error fetching appointments');
        } finally {
          setLoading(false);
        }
      };

      fetchAppointments();
    }
  }, [salonId]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = appointments.filter(app =>
      app.customerEmail.toLowerCase().includes(query)
    );
    setFilteredAppointments(filtered);
  };

  // Handle pagination
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <SalonLayout>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div>
        <p style={{ textAlign: 'center', color: '#888', margin: '20px 0' }}>
          No appointments found yet. Please check back later!
        </p>
      </div>
      ) : (
        <div>
          <h1>Salon Appointments</h1>
          <input
            type="text"
            placeholder="Search by customer email"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {filteredAppointments.length === 0 ? (
            <div>
              <p style={{ textAlign: 'center', color: '#888', margin: '20px 0' }}>
                No appointments found yet. Please check back later!
              </p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Customer Email</th>
                  <th>Stylist</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.map((appointment, index) => (
                  <tr key={index}>
                    <td>{appointment.selectedDate}</td>
                    <td>{appointment.selectedTime}</td>
                    <td>{appointment.customerEmail}</td>
                    <td>{appointment.selectedStylist?.name}</td>
                    <td>{appointment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="pagination">
            {[...Array(Math.ceil(filteredAppointments.length / appointmentsPerPage)).keys()].map(number => (
              <button key={number} onClick={() => paginate(number + 1)}>
                {number + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </SalonLayout>
  );
};

export default SalonDashboard;
