import React from "react";

export default function MainContainer({ width = "full", children }) {
  switch (width) {
    case "xl":
      return <section className="max-w-xl p-2 mx-auto">{children}</section>;
    default: //full
      return <section className="max-w-[1000px] md:mx-auto">{children}</section>;
  }
}
