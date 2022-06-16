import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";

function useShoppingCart() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsGrouped, setCartItemsGrouped] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartItemsCount(cartItems.length);

    const grouped = cartItems.reduce((acc, item) => {
      const group = acc.find((group) => group.product.slug === item.slug);
      if (group) {
        group.count += 1;
      } else {
        acc.push({
          product: item,
          count: 1,
        });
      }
      return acc;
    }, []);
    //to sort alphatericly - to avoid issues with products changing the order
    grouped.sort((a, b) => a.product.slug.localeCompare(b.product.slug));
    setCartItemsGrouped(grouped);

    const total = cartItemsGrouped.reduce((acc, item) => {
      return acc + item.product.price * item.count;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const addItem = ({ cartItem }) => {
    setCartItems([...cartItems, cartItem]);
  };

  const removeItem = ({ cartItem }) => {
    if (cartItems.length > 0) {
      let lastIndex;
      const found = cartItems.find((item, index) => {
        if (item.slug === cartItem.slug) {
          lastIndex = index;
          console.log("last index: ", lastIndex);
          return true;
        } else return false;
      });
      if (found) {
        console.log("FOUND! lastIndex: ", lastIndex);
        const temp = [...cartItems];
        console.log("TEMP BEFORE");
        console.log(temp);
        temp.splice(lastIndex, 1);
        console.log("TEMP after");
        console.log(temp);
        setCartItems([...temp]);
      }
    } else {
      setCartItemsCount(0);
      setCardItems([]);
      setCartItemsGrouped([]);
    }
  };

  const removeAllItems = ({ cartItem }) => {
    const filtered = cartItems.filter((item) => item.slug !== cartItem.slug);
    setCartItems([...filtered]);
    // const group = cartItemsGrouped.find((itemsGroup) => itemsGroup.product.slug === cartItem.slug);
    // console.log(group);
    // if (group) {
    //   for (let i = 0; i < group.count; i++) {
    //     console.log("removing num: ", i);
    //     removeItem({ cartItem });
    //     console.log("current items length: ", cartItems.length);
    //   }
    // }
    // //setCartItemsCount(0);
  };

  return { cartItems, cartItemsCount, cartItemsGrouped, totalPrice, addItem, removeItem, removeAllItems };
}

export default useShoppingCart;
