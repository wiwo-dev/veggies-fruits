import { CloseIcon } from "components/Icons/CloseIcon";
import { Text } from "components/ui";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ECommerceContext } from "./ECommerceContext";

export default function SomethingInCartModal() {
  const { cartItems, productsCount, totalPrice, addProduct, removeProduct, removeAllProducts } =
    useContext(ECommerceContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (productsCount > 0) setIsModalOpen(true);
  }, [productsCount]);

  return (
    <>
      <AnimatePresence>
        {productsCount > 0 && isModalOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 50 }}
            exit={{ height: 0 }}
            className="fixed bottom-0 left-0 w-full bg-primary-9 flex justify-center items-center">
            <div className="font-body text-white">
              You got {productsCount} products in{" "}
              <Link href="/cart/view" className="">
                <a className="underline cursor-pointer">your cart!</a>
              </Link>
            </div>

            <div
              className="absolute right-3 top-[50%] bottom-0 w-[30px] h-[30px] cursor-pointer -translate-y-[50%]"
              onClick={() => {
                setIsModalOpen(false);
              }}>
              <CloseIcon fill="#ffffff" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
