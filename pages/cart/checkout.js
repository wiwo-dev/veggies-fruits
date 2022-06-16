import MainLayout from "components/layout/MainLayout";
import TransitionLayout from "components/layout/TransitionLayout";
import Link from "next/link";
import { Button, Heading, MainContainer, Modal, Text } from "components/ui";
import Portal from "components/HOC/Portal";
import DeliveryPanel from "components/Checkout/DeliveryPanel";

export default function Checkout() {
  return (
    <>
      <MainContainer width="xl">
        <Heading>Checkout</Heading>
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex sit explicabo est similique labore assumenda
          rerum deleniti eius qui aspernatur officiis quae amet debitis nesciunt, corporis tempore molestias cupiditate!
          Necessitatibus?
        </Text>
        <DeliveryPanel />
        <Link href="/cart">
          <a>
            <Button>Back to cart</Button>
          </a>
        </Link>
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
