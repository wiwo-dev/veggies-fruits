import Navbar from "components/Navbar/Navbar";
import SomethingInCartModal from "components/ShoppingCart/SomethingInCartModal";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  useEffect(() => {
    console.log("MainLayout mounting");
  }, []);

  return (
    <>
      <div className="overflow-x-hidden  relative">
        <Navbar />
        <div className="min-h-[90vh]">{children}</div>
        <div className="min-h-[80px]"></div>
        <SomethingInCartModal />
        <Footer />
      </div>
    </>
  );
}
