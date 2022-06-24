import { ECommerceContext } from "components/ShoppingCart/ECommerceContext";
import React, { useContext } from "react";

export default function OrderSummary() {
  const { cartItems, productsCount, totalPrice, addProduct, removeProduct, removeAllProducts } =
    useContext(ECommerceContext);

  return (
    <>
      <div className="text-primary-11 font-body">Order summary</div>
      {cartItems.map((cartItem, index) => (
        <div key={index} className="flex justify-between items-center p-3 text-primary-12 font-body">
          <div className="flex items-center gap-3">
            <div className="border-2 border-primary-6 rounded-md w-[50px] h-[50px] flex justify-center items-center">
              x{cartItem.quantity}
            </div>
            <div className="">
              <p>{cartItem.product.name}</p>
              <p className="text-sm text-sage">{cartItem.product.unit}</p>
            </div>
          </div>
          <div className="">{(cartItem.product.price * cartItem.quantity).toFixed(2)}$</div>
        </div>
      ))}
    </>
  );
}
