import AdminMenu from "components/admin/AdminMenu";
import Navbar from "components/Navbar/Navbar";
import React, { useEffect } from "react";
import Footer from "./Footer";

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <AdminMenu />
      <div className="min-h-[90vh]">{children}</div>
      <Footer />
    </>
  );
}
