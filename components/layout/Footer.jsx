import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <>
      <div className=" bg-primary-9 py-7">
        <div className="max-w-screen-md mx-auto flex flex-row items-center justify-center w-full h-10 px-4 text-white">
          <span className="font-abhaya-libre">
            This is just a demonstration project. Unfortunately you can not buy anything here :)
          </span>
        </div>
        <div className="max-w-screen-md mx-auto flex flex-row items-center justify-center w-full h-10 px-4 text-white">
          <span className="font-abhaya-libre">
            &#169; <Link href="https://wiwoproduction.com">wiwoproduction.com</Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Footer;
