import React, { useEffect, useState, useRef } from "react";
import { NavLink,useNavigate  } from "react-router-dom"; // Import NavLink
import "./Layout.css";
import profilePic from "../../images/pimg.jpg";
import { useAuth } from "../../context/Auth";

const Sidebar = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
  const dropdownRef = useRef(); // Ref to detect outside clicks
  const myStoreButtonRef = useRef(null); // Ref for "My Store" button
  const [auth, setAuth] = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to handle modal visibility
  const navigate = useNavigate(); // Hook to navigate programmatically
  useEffect(() => {
    const allSideMenu = document.querySelectorAll(
      "#sidebar .side-menu.top li a"
    );

    // Add 'active' class to clicked sidebar item
    allSideMenu.forEach((item) => {
      const li = item.parentElement;

      item.addEventListener("click", () => {
        // Remove 'active' from all items
        allSideMenu.forEach((i) => i.parentElement.classList.remove("active"));

        // Add 'active' class to clicked item
        li.classList.add("active");

        // Ensure sidebar stays open and close dropdown if another item is clicked
        setIsSidebarOpen(true);
        setIsDropdownOpen(false);
      });
    });

    const menuBar = document.querySelector("#content nav .bx.bx-menu");

    // Toggle sidebar open/close
    const toggleSidebar = () => {
      setIsSidebarOpen((prevState) => !prevState);
    };

    menuBar.addEventListener("click", toggleSidebar);

    // Detect outside clicks to close dropdown
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        myStoreButtonRef.current &&
        !myStoreButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      menuBar.removeEventListener("click", toggleSidebar);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Function to toggle the dropdown
  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Prevent event bubbling

    setIsDropdownOpen((prevState) => !prevState);
  };

  // Handle logout action
  const HandleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.setItem("bannerDismissed", JSON.stringify(false)); // Store as "false" (string)
    setShowLogoutModal(false); // Close the modal after logout
     // Navigate to login page
     navigate("/login"); // Redirect to the login page
  };

  // Open logout modal
  const handleLogoutModalOpen = () => {
    setShowLogoutModal(true);
  };

  // Close logout modal
  const handleLogoutModalClose = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* SIDEBAR */}
      <section id="sidebar" className={isSidebarOpen ? "show" : "hide"}>
        <a href="/dashboard/salon" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">SalonSphere</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="#">
              <i className="bx bxs-dashboard icon-hover"></i>
              <NavLink to="/dashboard/salon" className="text">
                Dashboard
              </NavLink>
            </a>
          </li>

          {/* My Store Dropdown */}
          <li
            ref={dropdownRef}
            className={`dropdown ${isDropdownOpen ? "active" : ""}`}
          >
            <a
              onClick={toggleDropdown}
              ref={myStoreButtonRef} // Attach the ref here
            >
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">My Salon</span>
              <i
                className={`bx ${isDropdownOpen ? "bxs-chevron-up" : "bxs-chevron-down"
                  }`}
              ></i>
            </a>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to="/dashboard/create-salon-profile"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Create Salon
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/edit-salon-profile"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Edit Salon
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/view-salon-profile"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    View Salon
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a href="#">
              <i className="bx bxs-calendar"></i>
              <NavLink to="/dashboard/salon/appointments" className="text">
                Appointments
              </NavLink>
            </a>
          </li>
          <li>
            <NavLink
              to="/dashboard/view-your-salon-services"
              className="text"
              aria-label="Analytics"
              title="Analytics"
            >
              <i className="bx bxs-doughnut-chart"></i> Our services
            </NavLink>
          </li>

          <li>
            <a href="#">
              <i className="bx bxs-group"></i>
              <NavLink to="/dashboard/view-your-team-member" className="text">
                Team
              </NavLink>
            </a>
          </li>
        </ul>

        <ul className="side-menu">
          <li>
            <a href="#">
              <i className="bx bxs-cog"></i>
              <NavLink to="/dashboard/salon/settings" className="text">
                Settings
              </NavLink>
            </a>
          </li>
          <li>
            <a href="#" className="logout" onClick={handleLogoutModalOpen}>
              <i className="bx bxs-log-out-circle"></i>
              <NavLink  className="text">
                Logout
              </NavLink>
            </a>
          </li>
        </ul>
      </section>

      {/* LOGOUT MODAL */}
      <div
        className={`modal fade ${showLogoutModal ? "show" : ""}`}
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden={!showLogoutModal}
        style={{ display: showLogoutModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">
                Are You Sure You Want to Logout?
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleLogoutModalClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Do you want to log out of your account?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleLogoutModalClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={HandleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section id="content">
        <nav>
          <i className="bx bx-menu"></i>
          <a href="#" className="nav-link">
            Categories
          </a>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Search..." />
              <button type="submit" className="search-btn">
                <i className="bx bx-search"></i>
              </button>
            </div>
          </form>
          <input type="checkbox" id="switch-mode" hidden />
          <a href="#" className="profile">
            <img src={profilePic} alt="Profile" />
          </a>
        </nav>

        <main>{children}</main>
      </section>
    </>
  );
};

export default Sidebar;
