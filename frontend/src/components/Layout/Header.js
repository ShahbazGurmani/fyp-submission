import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  Drawer,
  Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import logo from "../../images/SsLogo.png";
import "../../styles/Header.css";
import NavBanner from "../../banners/NavBanner";
import { useAuth } from "../../context/Auth";

const Header = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:1024px)");
  const isDesktop = useMediaQuery("(min-width:1025px)");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  // Initialize banner visibility state from localStorage
  const [bannerVisible, setBannerVisible] = useState(
    () => localStorage.getItem("bannerDismissed") !== "true"
  );

  // Save the banner visibility to localStorage when closed
  const handleBannerClose = () => {
    setBannerVisible(false);
    localStorage.setItem("bannerDismissed", "true"); // Store dismissed state
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // use navigation

  const HandleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.setItem("bannerDismissed", JSON.stringify(false)); // Store as "false" (string)
  };

  return (
    <>
      {/* Show the banner if it's visible */}
      {bannerVisible && <NavBanner onClose={handleBannerClose} />}

      <Box>
        <AppBar
          component={"nav"}
          sx={{
            bgcolor: "white",
            marginTop: bannerVisible ? (isMobile ? "90px" : "70px") : "0px",
            transition: "margin-top 0.3s ease-in-out",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 16px",
            }}
          >
            {/* Left Profile Icon */}
            {(isMobile || isTablet) && (
              <IconButton onClick={toggleDrawer(true)}>
                <AccountCircleIcon sx={{ color: "black", fontSize: "2rem" }} />
              </IconButton>
            )}

            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                justifyContent: isDesktop ? "flex-start" : "center",
                alignItems: "center",
                flexGrow: 1,
                marginLeft: isDesktop ? "40px" : "0px",
              }}
            >
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <img src={logo} alt="Logo" className="logo" />
              </NavLink>
            </Box>

            {/* Right Icons */}
            {(isMobile || isTablet) && (
              <IconButton>
                <NotificationsNoneIcon
                  sx={{ color: "black", fontSize: "2rem" }}
                />
              </IconButton>
            )}

            {isDesktop && (
              <>
                {!auth.user ? (
                  <>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      variant="outlined"
                      onClick={toggleDrawer(true)}
                      sx={{
                        borderColor: "#1c1a18",
                        color: "black",
                        marginRight: 2,
                        borderRadius: "20px",
                        textTransform: "none",
                        fontSize: "1.1rem",
                        padding: "6px 20px",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.08)",
                          borderColor: "black",
                        },
                      }}
                    >
                      Log in
                    </Button>
                    <Button
                      variant="contained"
                      onClick={toggleDrawer(true)}
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "20px",
                        textTransform: "none",
                        fontSize: "1.1rem",
                        padding: "6px 20px",
                        marginRight: 2,
                        "&:hover": {
                          backgroundColor: "#1c1a18",
                        },
                      }}
                    >
                      Sign up
                    </Button>
                  </>
                ) : (
                  <>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                      variant="outlined"
                      onClick={HandleLogout} // Your logout logic function
                      sx={{
                        borderColor: "#1c1a18",
                        color: "black",
                        marginRight: 2,
                        borderRadius: "20px",
                        textTransform: "none",
                        fontSize: "1.1rem",
                        padding: "6px 20px",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.08)",
                          borderColor: "black",
                        },
                      }}
                    >
                      <NavLink
                        to="/login" // Navigate to the login or any other page after logout
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Log out
                      </NavLink>
                    </Button>
                  </>
                )}
                {/* // Inside your component JSX */}
                <NavLink to="/notifications" style={{ textDecoration: "none" }}>
                  <IconButton>
                    <NotificationsNoneIcon
                      sx={{ color: "black", fontSize: "2rem" }}
                    />
                  </IconButton>
                </NavLink>
              </>
            )}
          </Toolbar>
        </AppBar>

        {/* Drawer for Login/Signup */}
        <Drawer
          anchor={isMobile ? "bottom" : isTablet ? "bottom" : "right"}
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: isTablet
              ? {
                  width: "50vw",
                  margin: "auto",
                  borderRadius: 4,
                  top: "25vh",
                  maxHeight: "75vh",
                }
              : { width: isMobile ? "100vw" : 400, padding: 2 },
          }}
        >
          {!auth.user ? (
            <>
              <Box
                sx={{
                  padding: 2,
                  textAlign: "center",
                  position: "relative",
                }}
                role="presentation"
              >
                <IconButton
                  onClick={toggleDrawer(false)}
                  sx={{ position: "absolute", right: 16, top: 16 }}
                >
                  <CloseIcon />
                </IconButton>

                <Typography variant="h6" sx={{ marginTop: 3 }}>
                  Welcome!
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 3 }}>
                  Sign up or log in to continue
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    marginBottom: 2,
                    width: "100%",
                    textTransform: "none",
                  }}
                >
                  <NavLink
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Log in
                  </NavLink>
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    color: "black",
                    borderColor: "black",
                    background: "white",
                    width: "100%",
                    textTransform: "none",
                  }}
                >
                  <NavLink
                    to="/signup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Sign Up
                  </NavLink>
                </Button>

                <Divider sx={{ marginY: 3 }} />
                <Button
                  variant="contained"
                  startIcon={<FacebookIcon />}
                  sx={{
                    backgroundColor: "#1877F2",
                    color: "white",
                    marginBottom: 2,
                    width: "100%",
                    textTransform: "none",
                  }}
                >
                  Continue with Facebook
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={{
                    color: "black",
                    borderColor: "#dddddd",
                    marginBottom: 2,
                    width: "100%",
                    textTransform: "none",
                  }}
                >
                  Continue with Google
                </Button>

                <Button
                  variant="contained"
                  startIcon={<AppleIcon />}
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    marginBottom: 2,
                    width: "100%",
                    textTransform: "none",
                  }}
                >
                  Continue with Apple
                </Button>

                <Typography
                  variant="caption"
                  sx={{ textAlign: "center", display: "block", marginTop: 2 }}
                >
                  By signing up, you agree to our{" "}
                  <a href="#" style={{ color: "blue" }}>
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" style={{ color: "blue" }}>
                    Privacy Policy
                  </a>
                  .
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  padding: 2,
                  textAlign: "center",
                  position: "relative",
                }}
                role="presentation"
              >
                <IconButton
                  onClick={toggleDrawer(false)}
                  sx={{ position: "absolute", right: 16, top: 16 }}
                >
                  <CloseIcon />
                </IconButton>

                <Typography variant="h6" sx={{ marginTop: 3 }}>
                  Logging out
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 3 }}>
                  Don’t miss me too much, I’ll be right here when you come back
                  😉
                </Typography>

                <Button
                  variant="outlined"
                  onClick={HandleLogout} // Your logout logic function
                  sx={{
                    borderColor: "#1c1a18",
                    color: "black",
                    marginRight: 2,
                    borderRadius: "20px",
                    textTransform: "none",
                    fontSize: "1.1rem",
                    padding: "6px 20px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      borderColor: "black",
                    },
                  }}
                >
                  <NavLink
                    to="/login" // Navigate to the login or any other page after logout
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Log out
                  </NavLink>
                </Button>

                <Divider sx={{ marginY: 3 }} />

                <Typography
                  variant="caption"
                  sx={{ textAlign: "center", display: "block", marginTop: 2 }}
                >
                  By signing up, you agree to our{" "}
                  <a href="#" style={{ color: "blue" }}>
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" style={{ color: "blue" }}>
                    Privacy Policy
                  </a>
                  .
                </Typography>
              </Box>

              {/* <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="outlined"
                onClick={HandleLogout} // Your logout logic function
                sx={{
                  borderColor: "#1c1a18",
                  color: "black",
                  marginRight: 2,
                  borderRadius: "20px",
                  textTransform: "none",
                  fontSize: "1.1rem",
                  padding: "6px 20px",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                    borderColor: "black",
                  },
                }}
              >
                <NavLink
                  to="/login" // Navigate to the login or any other page after logout
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Log out
                </NavLink>
              </Button> */}
            </>
          )}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
