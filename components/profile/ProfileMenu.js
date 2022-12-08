import HorizontalMenuLink from "components/admin/HorizontalMenuLink";
import ShoppingBasketIcon from "components/Icons/ShoppingBasketIcon";
import UserLoggedIcon from "components/Icons/UserLoggedIcon";
import React from "react";

function ProfileMenu() {
  return (
    <ul className="flex gap-10 justify-center py-3">
      <li>
        <HorizontalMenuLink href="/profile/orders">
          <span className="flex items-center gap-3">
            <ShoppingBasketIcon size={20} fill="#427A42" />
            Your Orders
          </span>
        </HorizontalMenuLink>
      </li>
      <li>
        <HorizontalMenuLink href="/profile/edit">
          <span className="flex items-center gap-3">
            <UserLoggedIcon size={20} fill="#427A42" />
            Edit Profile
          </span>
        </HorizontalMenuLink>
      </li>
    </ul>
  );
}

export default ProfileMenu;
