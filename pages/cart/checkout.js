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
      setOrder(newOrder.order);
      setIsProcessing(false);
      router.push(`/cart/pay?orderId=${JSON.stringify(newOrder.order.id)}`);
    } else {
      console.log("ERROR");
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
      <motion.div
        variants={variants}
        initial={transitionDirection === "back" ? "left" : "right"}
        animate="enter"
        exit={isGoingBack ? "right" : "left"}
        key="view"
        location="view">
        <MainContainer width="xl">
          <JsonPreviewer>{session}</JsonPreviewer>
          <Heading>Checkout</Heading>
          <Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex sit explicabo est similique labore assumenda
            rerum deleniti eius qui aspernatur officiis quae amet debitis nesciunt, corporis tempore molestias
            cupiditate! Necessitatibus?
          </Text>
          <BoxSection>
            <AccountPanel />
          </BoxSection>

          <BoxSection>
            <DeliveryPanel deliveryAddress={deliveryAddress} setDeliveryAddress={setDeliveryAddress} />
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
              <Button onClick={sendOrder} loading={isProcessing}>
                Make order
              </Button>
            </section>
          </BoxSection>
        </MainContainer>
      </motion.div>
    </>
  );
}

Checkout.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AnimationPresenceLayout>
        {/* <TransitionLayout key="checkout"> */}
        {page}
        {/* </TransitionLayout> */}
      </AnimationPresenceLayout>
    </MainLayout>
  );
};
