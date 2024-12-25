import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {/* Layout wrapper that ensures full height including the footer */}
      <div
        style={{
          minHeight: "100vh", // Ensure the layout takes the full viewport height
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Content wrapper to ensure the footer is pushed to the bottom */}
        <div style={{ flex: 1, paddingTop: "80px" }}>
          {" "}
          {/* Adjust padding for header */}
          {children}
        </div>
        {/* Footer remains at the bottom */}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
