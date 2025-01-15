import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../images/SsLogo.png"; // Ensure the logo path is correct

const BusinessHeader = () => {
  return (
    <AppBar
      position="fixed" // Use fixed to make the header stay on top
      sx={{ bgcolor: "#1c1a18", color: "white", zIndex: 1300 }} // Ensure it's above other elements
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Business Logo"
              style={{ width: "40px", marginRight: "10px" }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Business SignUp Portal
            </Typography>
          </Box>
        </Link>

        {/* Login Button */}
        <Button
          variant="outlined"
          component={Link}
          to="/login" // Link to business portal login page
          sx={{
            color: "white",
            borderColor: "white",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderColor: "white",
            },
          }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default BusinessHeader;
