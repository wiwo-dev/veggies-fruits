import OrderSummary from "components/Checkout/OrderSummaryPanel";
import { useState } from "react";

export default function OrderRow({ order }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <p className="text-primary-12">
        Order ID: {order.id} || Status: {order.status} || Created: {new Date(order.createdAt).toLocaleString("pl-PL")}
      </p>
      {!isOpen && <div onClick={() => setIsOpen(true)}>Show more</div>}
      {isOpen && <div onClick={() => setIsOpen(false)}>Show less</div>}

      {isOpen && (
        <>
          <p className="">{JSON.stringify(order.deliveryAddress, null, 2)}</p>
          <OrderSummary cartItems={order.CartItems} />
        </>
      )}
      <hr></hr>
    </div>
  );
}
