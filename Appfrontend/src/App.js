import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/UserAuth/Login/Login";
import SignUp from "./pages/UserAuth/Register/SignUp";
import ScrollTop from "./components/ScrollTop";
import BusinessAuth from "./pages/BusinessAuth/BusinessAuth";
import Notification from "./pages/Notification/Notification";
import DashBoard from "./pages/Users/DashBoard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/DashBoard/AdminDashboard";
import SalonRoute from "./components/Routes/SalonRoute";
import SalonDashboard from "./pages/Salon/Dashboard/SalonDashboard";
import CreateSalon from "./pages/Salon/Dashboard/CreateSalon/CreateSalon";
import ViewSalon from "./pages/Salon/Dashboard/ViewSalon/ViewSalon";
import EditSalonProfile from "./pages/Salon/Dashboard/EditSalonProfile/EditSalonProfile";
import AboutUs from "./pages/AboutUs/AboutUs";
import OutTeam from "./pages/Salon/Dashboard/OurTeam/OutTeam";
import OurServices from "./pages/Salon/Dashboard/OurServices/OurServices";
import Appointment from "./pages/Salon/Dashboard/Appointments/Appointment";
import SalonSetting from "./pages/Salon/Dashboard/Setting/SalonSetting";
import PravicyAndPolicy from "./pages/Pravicy/PravicyAndPolicy";
import TermAndServices from "./pages/TermAndServices/TermAndServices";
import ContactUs from "./pages/ContactUs/ContactUs";
import FutureWork from "./pages/FutureWork";
function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollTop /> {/* Add this component inside the Router */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PravicyAndPolicy />} />
          <Route path="/term-and-services" element={<TermAndServices />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/coming-soon" element={<FutureWork />} />

          <Route path="*" element={<PageNotFound />} />
          {/* nested Route for user */}
          <Route path="/dashboard/" element={<PrivateRoute />}>
            <Route path="" element={<DashBoard />} />
          </Route>

          {/* nested Route for admin portal */}
          <Route path="/dashboard/" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>

          {/* nested Route for Salon Owner portal */}
          <Route path="/dashboard/" element={<SalonRoute />}>
            <Route path="salon" element={<SalonDashboard />} />
            <Route path="salon/appointments" element={<Appointment />} />
            <Route path="salon/settings" element={<SalonSetting />} />
            <Route path="create-salon-profile" element={<CreateSalon />} />
            <Route path="view-salon-profile" element={<ViewSalon />} />
            <Route path="edit-salon-profile" element={<EditSalonProfile />} />
            <Route path="view-your-team-member" element={<OutTeam />} />
            <Route path="view-your-salon-services" element={<OurServices />} />
            
          </Route>
          {/* for auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* business signup */}
          <Route path="/business-signup" element={<BusinessAuth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
