import React, { useState } from "react";

export default function Sidebar2() {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="fixed left-0 top-[40px] h-screen min-w-[200px] bg-primary-9">Sidebar2</div>;
}
