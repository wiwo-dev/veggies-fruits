import { AnimateSharedLayout, LayoutGroup, motion, useAnimation } from "framer-motion";
import { useEffect, useState, useContext } from "react";

import { ECommerceContext } from "components/ShoppingCart/ECommerceContext";
import Image from "next/image";
import Link from "next/link";

export default function CartItemRow({ cartItem }) {
  const { name, mainPhotoUrl, unit, price, slug } = cartItem.product;
  const { quantity } = cartItem;

  const { cartItems, productsCount, totalPrice, addProduct, removeProduct, removeAllProducts } =
    useContext(ECommerceContext);

  const imageWidth = 110;
  const imageHeight = 80;

  return (
    <div className="flex items-center gap-5 justify-between p-3">
      <div className="">
        <Link href={`/products/${slug}`} className="cursor-pointer">
          <div
            className={`w-[${imageWidth}px] relative bg-gradient-to-r from-green-200 to-green-700`}
            style={{ height: `${imageHeight}px` }}>
            <Image
              src={`${mainPhotoUrl}?fit=facearea&w=${imageWidth}&h=${imageHeight}`}
              width={imageWidth}
              height={imageHeight}
              alt={name}
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between pt-1">
          <div className="flex flex-col mb-2 gap-0">
            <Link href={`/products/${slug}`} className="cursor-pointer">
              <p className="font-body text-primary-12 text-lg">{name}</p>
            </Link>
            <span className="font-body text-sage text-sm lowercase">{unit}</span>
            <span className="font-body self-start text-primary-11">{price.toFixed(2)}$</span>
          </div>
        </div>
      </div>

      <div className="xs:grow flex flex-col xs:flex-row justify-between items-center gap-5 md:gap-10">
        <div className="grow">
          <div className="mx-auto w-fit h-[36px] bg-primary-9 flex flex-row items-center justify-between rounded-full px-0 shadom-md right-[-8px] top-[-8px] transition-transform">
            <RemoveProductButton
              onClick={() => {
                removeProduct({ product: cartItem.product });
              }}
            />
            <span className="text-base font-bold text-white font-abhaya-libre">{quantity}</span>
            <AddProductButton
              onClick={() => {
                addProduct({ product: cartItem.product });
              }}
            />
          </div>
        </div>
        <span className="font-abhaya-libre text-primary-11 text-lg"> {(price * quantity).toFixed(2)}$</span>
        <RemoveAllButton
          onClick={() => {
            removeAllProducts({ product: cartItem.product });
          }}
        />
      </div>
    </div>
  );
}

const RemoveProductButton = ({ onClick }) => {
  return (
    <button
      className="w-[36px] h-[36px] rounded-full bg-primary-9 flex items-center justify-center hover:bg-primary-10 active:bg-primary-11"
      onClick={onClick}>
      <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.5 18C4.5293 18 0.5 13.9707 0.5 9C0.5 4.0293 4.5293 0 9.5 0C14.4707 0 18.5 4.0293 18.5 9C18.5 13.9707 14.4707 18 9.5 18ZM9.5 16.2C11.4096 16.2 13.2409 15.4414 14.5912 14.0912C15.9414 12.7409 16.7 10.9096 16.7 9C16.7 7.09044 15.9414 5.25909 14.5912 3.90883C13.2409 2.55857 11.4096 1.8 9.5 1.8C7.59044 1.8 5.75909 2.55857 4.40883 3.90883C3.05857 5.25909 2.3 7.09044 2.3 9C2.3 10.9096 3.05857 12.7409 4.40883 14.0912C5.75909 15.4414 7.59044 16.2 9.5 16.2Z"
          fill="white"
        />
        <path d="M14 8.1V9.9H5V8.1H14Z" fill="white" />
      </svg>
    </button>
  );
};

const AddProductButton = ({ onClick }) => {
  return (
    <button
      className="w-[36px] h-[36px] rounded-full bg-primary-9 flex items-center justify-center hover:bg-primary-10 active:bg-primary-11"
      onClick={onClick}>
      <svg layout="position" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.1 11.1V7.5H12.9V11.1H16.5V12.9H12.9V16.5H11.1V12.9H7.5V11.1H11.1ZM12 21C7.0293 21 3 16.9707 3 12C3 7.0293 7.0293 3 12 3C16.9707 3 21 7.0293 21 12C21 16.9707 16.9707 21 12 21ZM12 19.2C13.9096 19.2 15.7409 18.4414 17.0912 17.0912C18.4414 15.7409 19.2 13.9096 19.2 12C19.2 10.0904 18.4414 8.25909 17.0912 6.90883C15.7409 5.55857 13.9096 4.8 12 4.8C10.0904 4.8 8.25909 5.55857 6.90883 6.90883C5.55857 8.25909 4.8 10.0904 4.8 12C4.8 13.9096 5.55857 15.7409 6.90883 17.0912C8.25909 18.4414 10.0904 19.2 12 19.2V19.2Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

const RemoveAllButton = ({ onClick }) => {
  return (
    <button
      className="w-[36px] h-[36px] rounded-full bg-primary-9 flex items-center justify-center hover:bg-primary-10 active:bg-primary-11"
      onClick={onClick}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
          fill="white"
        />
      </svg>
    </button>
  );
};
