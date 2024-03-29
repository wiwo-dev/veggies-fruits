import MainLayout from "components/layout/MainLayout";
import TransitionLayout from "components/layout/TransitionLayout";
import Link from "next/link";
import { Button, Heading, MainContainer, Modal, Text } from "components/ui";
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
import AnimationPresenceLayout from "components/layout/AnimationPresenceLayout";
import { AnimatePresence, motion } from "framer-motion";
import { BoxSection, BoxHeading, BoxText } from "components/ui/BoxSection";

const variants = {
  right: { opacity: 0, x: 200 },
  enter: { opacity: 1, x: 0 },
  left: { opacity: 0, x: -200 },
};

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
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
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

  const [isDeliveryAddressFilled, setIsDeliveryAddressFilled] = useState(false);
  useEffect(() => {
    const check = (string) => string?.length > 0 && string !== "undefined";
    const incorrect = [
      deliveryAddress.name,
      deliveryAddress.email,
      deliveryAddress.address,
      deliveryAddress.city,
      deliveryAddress.postcode,
      deliveryAddress.country,
    ].filter((el) => !check(el));
    if (incorrect.length < 1) setIsDeliveryAddressFilled(true);
    else setIsDeliveryAddressFilled(false);
  }, [deliveryAddress]);

  const sendOrder = async () => {
    //object to send as request body
    const CartItems = cartItems.map((cartItem) => ({
      productId: cartItem.productId,
      quantity: cartItem.quantity,
    }));

    const requestBody = {
      status: "NEW",
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
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order`, requestBody, config);
      const { status, data: newOrder } = response;
      console.log(response);
      if (status === 200) {
        console.log("Success!");
        setOrder(newOrder.order);
        setIsProcessing(false);
        router.push(`/cart/pay?orderId=${JSON.stringify(newOrder.order.id)}`);
      } else {
        console.log("ERROR ON THE SERVER");
        setIsProcessing(false);
      }
    } catch (error) {
      console.log("ERROR WHILE POSTING");
      setIsProcessing(false);
    }
  };

  let transitionDirection = router.query.transition;
  const [isGoingBack, setIsGoingBack] = useState(false);
  useEffect(() => {
    console.log(router.query.transition);
  }, []);

  return (
    <>
      <MainContainer width="xl">
        <Heading>Checkout</Heading>
        <Text>Choose if you would like your order to be delivered or you prefere self pickup</Text>
        <BoxSection>
          <AccountPanel />
        </BoxSection>

        <BoxSection>
          <DeliveryPanel
            deliveryAddress={deliveryAddress}
            setDeliveryAddress={setDeliveryAddress}
            isDeliveryAddressFilled={isDeliveryAddressFilled}
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
          />
        </BoxSection>

        <BoxSection>
          <OrderSummary cartItems={cartItems} />
        </BoxSection>

        <BoxSection>
          <section className=" flex justify-around">
            <Link href="/cart/view?transition=back">
              <a
                onClick={() => {
                  setIsGoingBack(true);
                }}>
                <Button>Back</Button>
              </a>
            </Link>
            <Button
              onClick={sendOrder}
              loading={isProcessing}
              disabled={!isDeliveryAddressFilled && deliveryMethod !== "pickup"}>
              Confirm order
            </Button>
          </section>
        </BoxSection>
      </MainContainer>
    </>
  );
}

Checkout.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AnimationPresenceLayout>
        <TransitionLayout key="checkout">{page}</TransitionLayout>
      </AnimationPresenceLayout>
    </MainLayout>
  );
};
