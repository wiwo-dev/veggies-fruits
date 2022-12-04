import Link from "next/link";
import React from "react";

export default function AdminMenu() {
  return (
    <ul className="flex gap-10 justify-center py-3">
      <li>
        <Link
          href="/admin/orders
        ">
          <div className="flex items-center p-2 text-base font-normal text-primary-11 rounded-lg bg-primary-3 hover:bg-primary-4 cursor-pointer">
            <svg
              className="w-6 h-6 text-primary-11 transition duration-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            <span className="ml-3">Orders</span>
          </div>
        </Link>
      </li>
      <li>
        <Link href="/admin/products/list">
          <div className="flex items-center p-2 text-base font-normal text-primary-11 rounded-lg bg-primary-3 hover:bg-primary-4 cursor-pointer">
            <svg
              className="w-6 h-6 text-primary-11 transition duration-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
          </div>
        </Link>
      </li>
      <li>
        <Link href="#">
          <div className="flex items-center p-2 text-base font-normal text-primary-11 rounded-lg bg-primary-3 hover:bg-primary-4 cursor-pointer">
            <svg
              className="w-6 h-6 text-primary-11 transition duration-75"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
          </div>
        </Link>
      </li>
    </ul>
  );
}
