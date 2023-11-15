/* eslint-disable @next/next/no-img-element */
import JsonPreviewer from "components/JsonPreviewer";
import { useContext, useEffect } from "react";
import Link from "next/link";
import MainLayout from "components/layout/MainLayout";
import TransitionLayout from "components/layout/TransitionLayout";
import { ECommerceContext } from "components/ShoppingCart/ECommerceContext";
import { Text, Heading, Button, MainContainer, BoxSection } from "components/ui";
import Confetti from "components/Confetti";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ThankYouPage({}) {
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

  const {
    query: { session_id },
  } = useRouter();

  useEffect(() => {
    emptyCart();
  }, []);

  const { data: checkoutSession, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/checkout/checkout-session/${session_id}`,
    fetcher
  );

  const { data: session } = useSession();

  return (
    <>
      <MainContainer width="xl">
        <BoxSection>
          <Heading>Thank you! Your order is paid</Heading>
          <Text>Hope you enjoy :)</Text>
          {checkoutSession?.client_reference_id && <Text>Your order ID is: {checkoutSession.client_reference_id}</Text>}

          <section className="my-5 flex gap-5">
            <Link href="/">
              <a>
                <Button>Continue shopping</Button>
              </a>
            </Link>
            {session && (
              <Link href="/profile/orders">
                <a>
                  <Button>All orders</Button>
                </a>
              </Link>
            )}
          </section>
        </BoxSection>
      </MainContainer>
      {checkoutSession && <Confetti />}
    </>
  );
}

ThankYouPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <TransitionLayout key="thankyou">{page}</TransitionLayout>
    </MainLayout>
  );
};
