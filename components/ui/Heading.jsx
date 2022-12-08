import React from "react";

export default function Heading({ children, className }) {
  return <p className={`font-display text-primary-11 text-xl mt-5 ${className}`}>{children}</p>;
}
