import Navbar from "components/Navbar/Navbar";
import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";

export default function AnimationPresenceLayout({ children }) {
  useEffect(() => {
    console.log("AnimationPresenceLayout mounting");
  }, []);

  return (
    <>
      <AnimatePresence
        exitBeforeEnter
        //initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}>
        {children}
      </AnimatePresence>
    </>
  );
}
