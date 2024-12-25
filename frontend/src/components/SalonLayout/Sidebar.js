import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import "./Layout.css";

const Sidebar = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
  const dropdownRef = useRef(); // Ref to detect outside clicks
  const myStoreButtonRef = useRef(null); // Ref for "My Store" button

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

  // Toggle the dropdown for "My Store"
  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Prevent event bubbling

    // Close if already open, otherwise open
    setIsDropdownOpen((prevState) => !prevState);
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
                className={`bx ${
                  isDropdownOpen ? "bxs-chevron-up" : "bxs-chevron-down"
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
              <i className="bx bxs-doughnut-chart"></i>
              <NavLink to="/shop" className="text">
                Analytics
              </NavLink>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-message-dots"></i>
              <NavLink to="/message" className="text">
                Message
              </NavLink>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-group"></i>
              <NavLink to="/team" className="text">
                Team
              </NavLink>
            </a>
          </li>
        </ul>

        <ul className="side-menu">
          <li>
            <a href="#">
              <i className="bx bxs-cog"></i>
              <NavLink to="/settings" className="text">
                Settings
              </NavLink>
            </a>
          </li>
          <li>
            <a href="#" className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <NavLink to="/logout" className="text">
                Logout
              </NavLink>
            </a>
          </li>
        </ul>
      </section>
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
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <a href="#" className="notification">
            <i className="bx bxs-bell"></i>
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <img src="img/people.png" alt="Profile" />
          </a>
        </nav>

        <main>{children}</main>
      </section>
    </>
  );
};

export default Sidebar;
