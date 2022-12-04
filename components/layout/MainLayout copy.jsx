import AdminMenu from "components/admin/AdminMenu";
import Navbar from "components/Navbar/Navbar";
import React, { useEffect } from "react";

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <AdminMenu />
      {children}
    </>
  );
}
