import { ShoppingCartContext } from "components/ShoppingCart/ShoppingCartContext";
import React, { useContext } from "react";

export default function OrderSummary() {
  const { cartItems, cartItemsCount, cartItemsGrouped, addItem, removeItem, clearItems, totalPrice } =
    useContext(ShoppingCartContext);

  return (
    <>
      <div className="text-primary-11 font-body">Order summary</div>
      {cartItemsGrouped.map((group, index) => (
        <div key={index} className="flex justify-between items-center p-3 text-primary-12 font-body">
          <div className="flex items-center gap-3">
            <div className="border-2 border-primary-6 rounded-md w-[50px] h-[50px] flex justify-center items-center">
              x{group.count}
            </div>
            <div className="">{group.product.name}</div>
          </div>
          <div className="">{(group.product.price * group.count).toFixed(2)}$</div>
        </div>
      ))}
    </>
  );
}
