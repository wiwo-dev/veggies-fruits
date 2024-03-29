/* eslint-disable @next/next/no-img-element */
import JsonPreviewer from "components/JsonPreviewer";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "components/layout/MainLayout";
import TransitionLayout from "components/layout/TransitionLayout";
import CartItemRow from "components/ShoppingCart/CartItemRow";
import { ECommerceContext } from "components/ShoppingCart/ECommerceContext";
import { Text, Heading, Button, MainContainer } from "components/ui";
import AnimationPresenceLayout from "components/layout/AnimationPresenceLayout";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  right: { opacity: 0, x: 200 },
  enter: { opacity: 1, x: 0 },
  left: { opacity: 0, x: -200 },
};

export default function Cart({}) {
  const { cartItems, productsCount, totalPrice, addProduct, removeProduct, removeAllProducts, emptyCart } =
    useContext(ECommerceContext);

  const router = useRouter();
  let transitionDirection = router.query.transition;
  useEffect(() => {
    console.log(router.query.transition);
  }, []);

  return (
    <>
      <MainContainer width="xl">
        <section className="flex flex-row gap-2 items-center mt-3">
          <svg width={15} height={15} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 0.5C0 0.367392 0.0526784 0.240215 0.146447 0.146447C0.240215 0.0526784 0.367392 0 0.5 0H2C2.11153 3.08115e-05 2.21985 0.0373507 2.30773 0.106025C2.39561 0.174699 2.45801 0.270784 2.485 0.379L2.89 2H14.5C14.5734 2.00007 14.6459 2.0163 14.7124 2.04755C14.7788 2.0788 14.8375 2.12429 14.8844 2.1808C14.9313 2.23731 14.9651 2.30345 14.9835 2.37452C15.002 2.44558 15.0045 2.51984 14.991 2.592L13.491 10.592C13.4696 10.7066 13.4087 10.8101 13.3191 10.8846C13.2294 10.9591 13.1166 10.9999 13 11H4C3.88343 10.9999 3.77057 10.9591 3.68091 10.8846C3.59126 10.8101 3.53045 10.7066 3.509 10.592L2.01 2.607L1.61 1H0.5C0.367392 1 0.240215 0.947322 0.146447 0.853553C0.0526784 0.759785 0 0.632608 0 0.5Z"
              fill="#4D824D"
            />
            <path d="M3.10199 3L4.41499 10H12.585L13.898 3H3.10199Z" fill="#4D824D" />
            <path
              d="M5 11C4.46957 11 3.96086 11.2107 3.58579 11.5858C3.21071 11.9609 3 12.4696 3 13C3 13.5304 3.21071 14.0391 3.58579 14.4142C3.96086 14.7893 4.46957 15 5 15C5.53043 15 6.03914 14.7893 6.41421 14.4142C6.78929 14.0391 7 13.5304 7 13C7 12.4696 6.78929 11.9609 6.41421 11.5858C6.03914 11.2107 5.53043 11 5 11ZM12 11C11.4696 11 10.9609 11.2107 10.5858 11.5858C10.2107 11.9609 10 12.4696 10 13C10 13.5304 10.2107 14.0391 10.5858 14.4142C10.9609 14.7893 11.4696 15 12 15C12.5304 15 13.0391 14.7893 13.4142 14.4142C13.7893 14.0391 14 13.5304 14 13C14 12.4696 13.7893 11.9609 13.4142 11.5858C13.0391 11.2107 12.5304 11 12 11ZM5 12C5.26522 12 5.51957 12.1054 5.70711 12.2929C5.89464 12.4804 6 12.7348 6 13C6 13.2652 5.89464 13.5196 5.70711 13.7071C5.51957 13.8946 5.26522 14 5 14C4.73478 14 4.48043 13.8946 4.29289 13.7071C4.10536 13.5196 4 13.2652 4 13C4 12.7348 4.10536 12.4804 4.29289 12.2929C4.48043 12.1054 4.73478 12 5 12ZM12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12Z"
              fill="#4D824D"
            />
          </svg>
          <Heading>Your Cart</Heading>
        </section>
        <Text>
          {productsCount} items{" "}
          <span className="text-sage cursor-pointer">
            (<a onClick={() => emptyCart()}>clear all)</a>
          </span>
        </Text>

        {cartItems.length > 0 ? (
          <>
            <section className="mt-5 flex flex-col justify-between w-full gap-3">
              {cartItems.map((cartItem, index) => (
                <div key={index}>
                  <CartItemRow cartItem={cartItem} />
                  {index < cartItems.length - 1 && <hr className="border-primary-7" />}
                </div>
              ))}
            </section>
            <section className="w-full gap-3 mt-10">
              <hr className="border-primary-7" />
              <div className="flex justify-end">
                <span className="font-abhaya-libre text-primary-11 text-xl self-end">
                  Total: {totalPrice.toFixed(2)}$
                </span>
              </div>
              <div className="flex justify-end mt-3">
                <Link href="/cart/checkout">
                  <a>
                    <Button>Checkout</Button>
                  </a>
                </Link>
              </div>
            </section>
          </>
        ) : (
          <section className="mt-5 w-full max-w-xl">
            <Text>Your cart is empty. Add something :)</Text>
          </section>
        )}
      </MainContainer>
    </>
  );
}

Cart.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      <AnimationPresenceLayout>
        <TransitionLayout key="view" location="view">
          {page}
        </TransitionLayout>
      </AnimationPresenceLayout>
    </MainLayout>
  );
};
