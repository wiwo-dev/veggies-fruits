import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function ModalContent({ children, container }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (mounted) {
    return createPortal(<div className="absolute top-0 right-0 z-50">{children}</div>, container);
  } else {
    return null;
  }
}
