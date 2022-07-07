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
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import JsonPreviewer from "components/JsonPreviewer";

export default function Checkout() {
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
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const [deliveryAddress, setDeliveryAddress] = useState({});
  const { data: session } = useSession();

  useEffect(() => {
    console.log(session?.dbUser);
    setDeliveryAddress({
      name: session?.dbUser.name,
      email: session?.dbUser.email,
      address: session?.dbUser.address,
      address2: session?.dbUser.address2,
      city: session?.dbUser.city,
      postcode: session?.dbUser.postcode,
      country: session?.dbUser.country,
      phoneNumber: session?.dbUser.phoneNumber,
    });
  }, [session]);

  const sendOrder = async () => {
    //object to send as request body
    const CartItems = cartItems.map((cartItem) => ({
      productId: cartItem.productId,
      quantity: cartItem.quantity,
    }));

    const requestBody = {
      status: "NEW_SEND",
      CartItems,
      deliveryAddress,
    };

    const config = {
      //  headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };

    setIsProcessing(true);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order`, requestBody, config);
    const { status, data: newOrder } = response;
    console.log(response);
    if (status === 200) {
      console.log("Success!");
      setOrder(newOrder);
      emptyCart();
      setIsProcessing(false);
      router.push(`/cart/pay?order=${JSON.stringify(newOrder)}`);
    } else {
      console.log("ERROR");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <MainContainer width="xl">
        <JsonPreviewer>{session}</JsonPreviewer>
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
          <DeliveryPanel deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress} />
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
