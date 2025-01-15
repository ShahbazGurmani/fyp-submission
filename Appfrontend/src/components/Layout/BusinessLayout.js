import React from "react";
import BusinessHeader from "./BusinessHeader";
import Footer from "./Footer"; // Use the same footer as other layouts

const BusinessLayout = ({ children }) => {
  return (
    <>
      <BusinessHeader />
      {/* Full-page layout logic */}
      <div
        style={{
          minHeight: "100vh", // Full page height
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Content wrapper with dynamic content */}
        <div style={{ flex: 1, paddingTop: "80px" }}>{children}</div>
        {/* Footer pinned to the bottom */}
        <Footer />
      </div>
    </>
  );
};

export default BusinessLayout;
