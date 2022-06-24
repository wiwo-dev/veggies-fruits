import MainLayout from "components/layout/MainLayout";
import TransitionLayout from "components/layout/TransitionLayout";
import Link from "next/link";
import { Button, Heading, MainContainer, Modal, Text } from "components/ui";
import Portal from "components/HOC/Portal";
import DeliveryPanel from "components/Checkout/DeliveryPanel";
import AccountPanel from "components/Checkout/AccountPanel";
import OrderSummary from "components/Checkout/OrderSummaryPanel";
import { useContext, useState } from "react";
import { ECommerceContext } from "components/ShoppingCart/ECommerceContext";
import axios from "axios";
import { useRouter } from "next/router";

export default function Checkout() {
  const { cartItems, productsCount, totalPrice, addProduct, removeProduct, removeAllProducts } =
    useContext(ECommerceContext);

  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const sendOrder = async () => {
    //object to send as request body
    const CartItems = cartItems.map((cartItem) => ({
      productId: cartItem.productId,
      quantity: cartItem.quantity,
    }));

    const requestBody = {
      status: "NEW_SEND",
      CartItems,
    };

    const config = {
      //  headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };

    setIsProcessing(true);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order`, requestBody, config);
    const { status } = response;
    console.log(response);
    if (status === 200) {
      console.log("Success:");
      setIsProcessing(false);
      router.push("/cart/pay");
    } else {
      console.log("ERROR");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <MainContainer width="xl">
        <Heading>Checkout</Heading>
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex sit explicabo est similique labore assumenda
          rerum deleniti eius qui aspernatur officiis quae amet debitis nesciunt, corporis tempore molestias cupiditate!
          Necessitatibus?
        </Text>
        <section className="bg-primary-2 p-3 my-2">
          <AccountPanel />
        </section>
        <section className="bg-primary-2 p-3 my-2">
          <DeliveryPanel />
        </section>
        <section className="bg-primary-2 p-3 my-2">
          <OrderSummary />
        </section>
        <section className="bg-primary-2 p-3 my-2 flex justify-around">
          <Link href="/cart">
            <a>
              <Button>Back</Button>
            </a>
          </Link>
          <Button onClick={sendOrder} loading={isProcessing}>
            Make order
          </Button>
        </section>
      </MainContainer>
    </>
  );
}

Checkout.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <TransitionLayout key="checkout">{page}</TransitionLayout>
    </MainLayout>
  );
};
