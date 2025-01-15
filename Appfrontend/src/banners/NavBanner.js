import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom"; // Import Link

const NavBanner = ({ onClose }) => {
  const [visible, setVisible] = useState(true);

  // Detect screen size to make the banner responsive
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:1024px)");

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "10px 15px" : "15px 20px", // Adjust padding for mobile devices
        position: "fixed", // Changed from 'relative' to 'fixed'
        top: 0, // Stick it to the top of the page
        left: 0,
        right: 0,
        zIndex: 1000, // Ensure it appears above other elements
        flexDirection: isMobile ? "column" : "row", // Stack vertically on mobile, row for larger screens
        gap: isMobile ? "10px" : "20px", // Adjust gap for mobile view
        height: "auto", // Remove fixed height to avoid content cutting off
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isMobile ? "column" : "row",
          textAlign: isMobile ? "center" : "left", // Align text properly
        }}
      >
        {/* Banner Text */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Do you need a business account?
        </Typography>

        {/* Signup Button */}
        <Button
          component={Link}
          to="/business-signup"
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            textTransform: "none",
            fontSize: isMobile ? "1rem" : "1.2rem",
            fontWeight: "bold",
            marginLeft: isMobile ? "0px" : "10px", // Avoid margin on mobile view
            "&:hover": {
              color: "black",
              backgroundColor: "white",
              borderColor: "white",
            },
          }}
        >
          Sign Up Now
        </Button>
      </Box>

      {/* Close Icon with added margin-top */}
      <IconButton
        onClick={handleClose}
        sx={{
          color: "white",
          position: "absolute",
          right: "10px",
          top: isMobile ? "30px" : "auto",
          marginTop: "10px",
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default NavBanner;
