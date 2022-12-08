import ShoppingBasketIcon from "components/Icons/ShoppingBasketIcon";
import UserLoggedIcon from "components/Icons/UserLoggedIcon";
import Link from "next/link";
import React from "react";
import HorizontalMenuLink from "./HorizontalMenuLink";

export default function AdminMenu() {
  return (
    <ul className="flex gap-2 justify-center py-3 overflow-hidden">
      <li>
        <HorizontalMenuLink href="/admin/orders">
          <span className="flex items-center gap-3">
            <ShoppingBasketIcon size={20} fill="#427A42" />
            Orders
          </span>
        </HorizontalMenuLink>
      </li>
      <li>
        <HorizontalMenuLink href="/admin/products/list">
          <span className="flex items-center gap-3">
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
            Products
          </span>
        </HorizontalMenuLink>
      </li>
      <li>
        <HorizontalMenuLink href="#">
          <span className="flex items-center gap-3">
            <UserLoggedIcon size={20} fill="#427A42" />
            Users
          </span>
        </HorizontalMenuLink>
      </li>
    </ul>
  );
}
