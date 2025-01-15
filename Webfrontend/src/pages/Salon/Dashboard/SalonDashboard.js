import { useState, useEffect } from 'react';
import SalonLayout from "../../../components/SalonLayout/SalonLayout";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Styled Components
const DashboardContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 20px;
`;

const ChartWrapper = styled.div`
  flex: 1 0 30%;
  min-width: 300px;
  margin: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

const SummaryBox = styled.div`
  background-color: #e0f7fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Sample data for charts
const pieData = [
  { name: 'New Users', value: 400 },
  { name: 'Returning Users', value: 300 },
];

const lineData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4000 },
  { name: 'May', revenue: 6000 },
];

const barData = [
  { name: 'January', payments: 2400 },
  { name: 'February', payments: 1398 },
  { name: 'March', payments: 9800 },
  { name: 'April', payments: 3908 },
  { name: 'May', payments: 4800 },
];




const CompleteProfileButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const AppointmentSection = styled.div`
  background-color:#f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const UserTableSection = styled.div`
  padding: 20px;
  margin: 20px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;


const TableSearch = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

// Dummy user data
const userData = [
  { name: "John Doe", email: "john@example.com", phone: "123-456-7890", address: "123 Main St, Cityville" },
  { name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", address: "456 Elm St, Townsville" },
  { name: "Bob Johnson", email: "bob@example.com", phone: "555-123-4567", address: "789 Oak St, Villageton" },
  { name: "Alice Williams", email: "alice@example.com", phone: "555-987-6543", address: "101 Pine St, Greenfield" },
  { name: "Tom Brown", email: "tom@example.com", phone: "555-543-2109", address: "202 Birch St, Westcity" },
  { name: "Emily Clark", email: "emily@example.com", phone: "555-876-5432", address: "303 Cedar St, Northtown" },
  { name: "Michael Harris", email: "michael@example.com", phone: "555-432-1098", address: "404 Maple St, Riverdale" },
  { name: "Sarah Davis", email: "sarah@example.com", phone: "555-321-9876", address: "505 Oak St, Eastwood" },
];





const COLORS = ['#0088FE', '#00C49F'];

const totalAppointments = 150; // Dummy data
const currentMonthAppointments = 30; // Dummy data
const totalUsersConnected = 500; // Dummy data
// Calculate total and current month earnings
const totalEarnings = barData.reduce((total, item) => total + item.payments, 0);
const currentMonthEarnings = barData[barData.length - 1].payments;

const SalonDashboard = () => {

  const [salonId, setSalonId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // State to store errors

  useEffect(() => {
    const authData = localStorage.getItem('auth');
    const auth = authData ? JSON.parse(authData) : null;
    const userId = auth?.user?._id;

    if (!userId) {
      console.error('User ID not found in localStorage');
      setError('User not logged in');
      return;
    }

    // Fetch the salon ID based on the user ID
    const fetchSalonId = async () => {
      try {
        console.log(`Fetching salon data for user ID: ${userId}`);
        const response = await axios.get(
          `${process.env.REACT_APP_API}api/salon/view-salon/${userId}`
        );

        console.log('Salon data response:', response);

        if (response.data?.salonProfile) {
          const salonId = response.data.salonProfile._id;
          setSalonId(salonId); // Store the salon ID in state
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
  }, []); // Empty dependency array runs this only on mount

  useEffect(() => {
    if (salonId) {
      const fetchAppointments = async () => {
        setLoading(true);
        console.log('Fetching appointments for salon ID:', salonId);
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API}api/booking/salon-appointments/${salonId}`
          );
          console.log('Appointments response:', response);

          // Ensure the response contains the data you're expecting
          if (response.data && Array.isArray(response.data)) {
            console.log('Appointments data:', response.data);
            setAppointments(response.data);  // Set appointments data
          } else {
            console.log('No appointments data found');
            setAppointments([]);  // Handle empty or incorrect data
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




  const isNewUser = true; // Replace with actual logic
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleProfileCompletion = () => {
    // alert('Redirecting to profile completion');
    navigate('/dashboard/create-salon-profile'); // Navigate to the create salon profile page
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage, setAppointmentsPerPage] = useState(10);

  // Pagination & Search Logic

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter((appointment) =>
    appointment.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.phone_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current records for pagination
  const indexOfLastRecord = currentPage * appointmentsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - appointmentsPerPage;
  const currentRecords = filteredAppointments.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);


  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SalonLayout>
      <DashboardContainer>
        <Header>
          <h1>Welcome to Salon Sphere Business Account</h1>
          {isNewUser && (
            <CompleteProfileButton onClick={handleProfileCompletion}>
              Complete Your Salon Profile
            </CompleteProfileButton>
          )}
        </Header>

        <ChartContainer>
          <ChartWrapper>
            <h3>User Distribution</h3>
            <PieChart width={300} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartWrapper>

          <ChartWrapper>
            <h3>Monthly Revenue</h3>
            <LineChart
              width={300}
              height={300}
              data={lineData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ChartWrapper>

          <ChartWrapper>
            <SummaryBox>
              <h4>Total Earnings: ${totalEarnings}</h4>
              <h4>Current Month's Earnings: ${currentMonthEarnings}</h4>
            </SummaryBox>
            <h3>Payments Overview</h3>
            <BarChart
              width={300}
              height={300}
              data={barData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="payments" fill="#82ca9d" />
            </BarChart>
          </ChartWrapper>
        </ChartContainer>

        {/* New Section for Appointments */}
        <AppointmentSection>
          <h3>Salon Appointments</h3>
          <p>Total Appointments: {totalAppointments}</p>
          <p>Appointments This Month: {currentMonthAppointments}</p>
          <p>Users Connected to Salon: {totalUsersConnected}</p>
        </AppointmentSection>

        <div>
          <h3>Appointments for Your Salon</h3>

          {/* Show loading spinner if data is still being fetched */}
          {loading && <div>Loading...</div>}

          {/* Show error message if there is an error */}
         

          {/* Render appointments table if data is available */}
          {appointments.length > 0 ? (
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.first_name}</td>
                    <td>{appointment.last_name}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.phone_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            // Show message if no appointments are found
            <div  className="alert alert-danger">No appointments found for this salon.</div>
           
          )}
        </div>


      </DashboardContainer>
    </SalonLayout>
  );
};

export default SalonDashboard;
