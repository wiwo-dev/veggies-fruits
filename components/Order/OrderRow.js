import DeliveryIcon from "components/Checkout/DeliveryIcon";

import OrderSummary from "components/Checkout/OrderSummaryPanel";
import RightMoreArrowIcon from "components/Checkout/RightMoreArrowIcon";
import { BoxSection, BoxText } from "components/ui";
import { useState } from "react";

export default function OrderRow({ order }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        className="flex justify-between items-center p-3 rounded-md hover:bg-primary-4 hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-3">
          <div>
            <DeliveryIcon />
          </div>
          <div className="flex flex-col">
            <span className="text-sage font-body">
              Order ID: {order.id} || Status: {order.status} || Created:{" "}
              {new Date(order.createdAt).toLocaleString("pl-PL")}
            </span>
            <BoxText>
              {order.deliveryAddress.name} {order.deliveryAddress.address || ""}
              {order.deliveryAddress.address2 || ""}`
            </BoxText>
            <BoxText>
              {order.deliveryAddress.postcode} {order.deliveryAddress.city} {order.deliveryAddress.country}
            </BoxText>
            <BoxText>
              {order.deliveryAddress.email} {order.deliveryAddress.phoneNumber}
            </BoxText>
          </div>
        </div>
        <div className={`p-5 rounded-lg transition-all ${isOpen && "rotate-180"}`}>
          <RightMoreArrowIcon />
        </div>
      </div>

      {isOpen && (
        <BoxSection>
          <OrderSummary cartItems={order.CartItems} />
        </BoxSection>
      )}

      <hr></hr>
    </div>
  );
}
