import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, container }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        <div className="absolute top-0 right-0">
          <div>{children}</div>
        </div>,
        container
      )
    : null;
}
