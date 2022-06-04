/* eslint-disable @next/next/no-img-element */
import JsonPreviewer from "components/JsonPreviewer";
import Navbar from "components/Navbar";
import CartItemRow from "components/ShoppingCart/cartItemRow";
import { ShoppingCartContext } from "components/ShoppingCart/ShoppingCartContext";
import Button from "components/ui/Button";
import { useContext } from "react";

export default function Cart({}) {
  const { cartItems, cartItemsCount, cartItemsGrouped, addItem, removeItem, clearItems } =
    useContext(ShoppingCartContext);

  return (
    <>
      <Navbar />
      <JsonPreviewer>{cartItems}</JsonPreviewer>
      <section className="flex flex-col w-full gap-3 mx-5 my-5">
        {cartItemsGrouped.map((group, index) => (
          <CartItemRow key={index} group={group} />
        ))}
      </section>
    </>
  );
}
