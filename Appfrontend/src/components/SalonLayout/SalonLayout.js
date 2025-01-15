import React from "react";
import Sidebar from "./Sidebar";

const SalonLayout = ({ children }) => {
  return (
    <>
      <Sidebar>{children}</Sidebar> {/* Pass children to Sidebar */}
    </>
  );
};

export default SalonLayout;
