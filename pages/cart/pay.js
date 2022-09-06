/* eslint-disable @next/next/no-img-element */
import JsonPreviewer from "components/JsonPreviewer";
import { useContext, useState } from "react";
import Link from "next/link";
import MainLayout from "components/layout/MainLayout";
import TransitionLayout from "components/layout/TransitionLayout";
import { ECommerceContext } from "components/ShoppingCart/ECommerceContext";
import { Text, Heading, Button, MainContainer } from "components/ui";
import Confetti from "components/Confetti";
import axios from "axios";
import { useRouter } from "next/router";
import OrderSummary from "components/Checkout/OrderSummaryPanel";

// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "no-cors", // no-cors, *cors, same-origin
    //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: "same-origin", // include, *same-origin, omit
    headers: {
      //"Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    //redirect: "follow", // manual, *follow, error
    //referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  //to fix issues with 'opaque' - https://stackoverflow.com/questions/45696999/fetch-unexpected-end-of-input
  const string = await response.text();
  const json = string === "" ? {} : JSON.parse(string);
  return json;
}

export default function PayPage({}) {
  const {
    cartItems,
    productsCount,
    totalPrice,
    addProduct,
    removeProduct,
    removeAllProducts,
    emptyCart,
    order,
    setOrder,
  } = useContext(ECommerceContext);
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayClick = async () => {
    setIsProcessing(true);
    postData(`${process.env.NEXT_PUBLIC_API_URL}/checkout/create-checkout-session`, {
      orderId: "666666",
      order: { ...order },
    }).then((data) => {
      console.log("RECEIVED DATA FROM POST TO create-checkout-session");
      console.log(data);
      setIsProcessing(false);
      router.push(data.url);
    });
  };

  return (
    <>
      {/* <JsonPreviewer>{cartItems}</JsonPreviewer> */}

      <MainContainer width="xl">
        <Heading>Yeah!</Heading>
        <Text>Yeah! We have your order. Now you have to pay! 💸</Text>
        <section className="my-5">
          <Button onClick={handlePayClick} loading={isProcessing}>
            Pay
          </Button>
        </section>
        {/* <JsonPreviewer>{order}</JsonPreviewer> */}
        {order?.CartItems && (
          <section className="bg-primary-2 p-3 my-2">
            <OrderSummary cartItems={order.CartItems} />
          </section>
        )}
      </MainContainer>
      {/* <Confetti /> */}
    </>
  );
}

PayPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <TransitionLayout key="pay">{page}</TransitionLayout>
    </MainLayout>
  );
};
