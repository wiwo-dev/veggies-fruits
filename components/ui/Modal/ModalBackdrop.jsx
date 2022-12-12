import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalBackdrop = ({ children, onClick }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(<div className="absolute left-0 top-0 w-full h-screen" onClick={onClick}></div>, document.body)
    : null;
};

export default ModalBackdrop;
