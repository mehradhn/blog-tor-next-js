import React from "react";
// import Sidebar from "../components/Sidebar";
import MiniDrawer from "../components/MiniDrawer";

function DashboardLayout({ children }) {
  return (
    <MiniDrawer>
      <>{children}</>
    </MiniDrawer>
  );
}

export default DashboardLayout;
