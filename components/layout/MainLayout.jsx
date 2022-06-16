import Navbar from "components/Navbar";
import React from "react";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
