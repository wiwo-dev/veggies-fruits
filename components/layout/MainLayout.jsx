import Navbar from "components/Navbar/Navbar";
import SomethingInCartModal from "components/ShoppingCart/SomethingInCartModal";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";

export default function MainLayout({ children }) {
  useEffect(() => {
    console.log("MainLayout mounting");
  }, []);

  return (
    <>
      <Navbar />
      {children}
      <div className="min-h-[200px]"></div>
      <SomethingInCartModal />
    </>
  );
}
