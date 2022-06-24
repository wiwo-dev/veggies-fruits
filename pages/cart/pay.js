/* eslint-disable @next/next/no-img-element */
import JsonPreviewer from "components/JsonPreviewer";
import { useContext } from "react";
import Link from "next/link";
import MainLayout from "components/layout/MainLayout";
import TransitionLayout from "components/layout/TransitionLayout";
import { ECommerceContext } from "components/ShoppingCart/ECommerceContext";
import { Text, Heading, Button, MainContainer } from "components/ui";
import Confetti from "components/Confetti";

export default function PayPage({}) {
  const { cartItems, productsCount, totalPrice, addProduct, removeProduct, removeAllProducts } =
    useContext(ECommerceContext);

  return (
    <>
      {/* <JsonPreviewer>{cartItems}</JsonPreviewer> */}

      <MainContainer width="xl">
        <Heading>Yeah!</Heading>

        <Text>Yeah! We have your order. Now you have to pay! 💸</Text>

        <section className="my-5">
          <Link href="/cart/checkout">
            <a>
              <Button>Pay</Button>
            </a>
          </Link>
        </section>
      </MainContainer>
      <Confetti />
    </>
  );
}

PayPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <TransitionLayout key="cart">{page}</TransitionLayout>
    </MainLayout>
  );
};
