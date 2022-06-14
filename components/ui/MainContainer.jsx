import React from "react";

export default function MainContainer({ width = "full", children }) {
  switch (width) {
    case "xl":
      return <section className="max-w-xl p-1 mx-auto">{children}</section>;
    default:
      return <section className="max-w-[1000px] md:mx-auto">{children}</section>;
  }
}
