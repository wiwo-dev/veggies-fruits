import Link from "next/link";
import React from "react";

export default function HorizontalMenuLink({ children, href, active = false }) {
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer min-w-[100px] flex flex-col justify-between items-center px-3 py-2 bg-primary-3 hover:bg-primary-4 active:bg-primary-5  rounded-lg ${
          active ? "border-2 border-primary-7" : "border-2 border-transparent"
        }`}>
        <div className="font-body text-primary-12 text-lg flex justify-center">{children}</div>
      </div>
    </Link>
  );
}
