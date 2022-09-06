/* eslint-disable @next/next/no-img-element */
import JsonPreviewer from "components/JsonPreviewer";
import { useContext } from "react";
import Link from "next/link";
import MainLayout from "components/layout/MainLayout";
import TransitionLayout from "components/layout/TransitionLayout";
import { ECommerceContext } from "components/ShoppingCart/ECommerceContext";
import { Text, Heading, Button, MainContainer } from "components/ui";

export default function ErrorPage({}) {
  const { cartItems, productsCount, totalPrice, addProduct, removeProduct, removeAllProducts, order, setOrder } =
    useContext(ECommerceContext);

  return (
    <>
      {/* <JsonPreviewer>{cartItems}</JsonPreviewer> */}

      <MainContainer width="xl">
        <Heading>🙁</Heading>
        <Text>Sorry, sth went wrong.</Text>
        {/* <JsonPreviewer>{order}</JsonPreviewer> */}
        <section className="my-5">
          <Link href="/products">
            <a>
              <Button>Main page</Button>
            </a>
          </Link>
        </section>
      </MainContainer>
    </>
  );
}

ErrorPage.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <TransitionLayout key="error">{page}</TransitionLayout>
    </MainLayout>
  );
};
