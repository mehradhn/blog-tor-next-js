import React from "react";
import Navbar from "../components/Navbar";


function Weblayout({ children }) {

  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}

export default Weblayout;
