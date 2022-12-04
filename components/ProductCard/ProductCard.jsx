import { AnimateSharedLayout, LayoutGroup, motion, useAnimation } from "framer-motion";
import { useEffect, useState, useContext } from "react";

import { ECommerceContext } from "components/ShoppingCart/ECommerceContext";
import Image from "next/image";
import spinnerGif from "public/Spinner-1s-200px.gif";
import Link from "next/link";
import { ImgixImage } from "components/ui";

export default function ProductCard({ product, className }) {
  const { name, price, unit, mainPhotoUrl, slug, id } = product;
  const [countAdded, setCountAdded] = useState(0);
  const controls = useAnimation();
  //const { addItem, removeItem, removeAllItems, cartItems, cartItemsGrouped } = useContext(ECommerceContext);
  const { cartItems, productsCount, totalPrice, addProduct, removeProduct, removeAllProducts } =
    useContext(ECommerceContext);

  //animation
  useEffect(() => {
    if (countAdded > 0) {
      controls.start({
        width: "85px",
      });
    }

    if (countAdded === 0) {
      controls.start({
        width: "36px",
      });
    }
  }, [countAdded]);

  //to set
  useEffect(() => {
    const found = cartItems.find((item) => item.productId === product.id);
    if (found) setCountAdded(found.quantity);
  }, [cartItems]);

  const handleClickPlus = () => {
    setCountAdded(countAdded + 1);
    addProduct({ product });
  };

  const handleClickDelete = () => {
    setCountAdded(0);
    removeAllProducts({ product });
  };

  return (
    <div className={`w-[155px] bg-primary-2 rounded-lg overflow-hidden shadow-md ${className}`}>
      <div className="w-full h-[120px] bg-gradient-to-tr from-primary-6 to-primary-8 relative">
        <Link href={`/products/${slug}`}>
          <div>
            <ImgixImage
              //src={`${mainPhotoUrl}?q=100&fit=facearea&w=155&h=120`}
              src={`${mainPhotoUrl}`}
              width="155px"
              height="120px"
              className="object-cover w-[155px] h-[120px] hover:scale-105 transition-all cursor-pointer"
              alt={name}
              placeholder="blur"
              blurDataURL={spinnerGif}
            />
          </div>
        </Link>
        <motion.div
          animate={controls}
          className="absolute w-fit h-[36px] bg-primary-9 flex flex-row-reverse items-center justify-between rounded-tr-lg rounded-bl-lg px-0 shadom-md right-[0px] top-[0px] transition-transform">
          <button
            className="w-[36px] h-[36px] rounded-lg bg-primary-9 flex items-center justify-center hover:bg-primary-10 active:bg-primary-11"
            onClick={handleClickPlus}>
            <svg
              layout="position"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.1 11.1V7.5H12.9V11.1H16.5V12.9H12.9V16.5H11.1V12.9H7.5V11.1H11.1ZM12 21C7.0293 21 3 16.9707 3 12C3 7.0293 7.0293 3 12 3C16.9707 3 21 7.0293 21 12C21 16.9707 16.9707 21 12 21ZM12 19.2C13.9096 19.2 15.7409 18.4414 17.0912 17.0912C18.4414 15.7409 19.2 13.9096 19.2 12C19.2 10.0904 18.4414 8.25909 17.0912 6.90883C15.7409 5.55857 13.9096 4.8 12 4.8C10.0904 4.8 8.25909 5.55857 6.90883 6.90883C5.55857 8.25909 4.8 10.0904 4.8 12C4.8 13.9096 5.55857 15.7409 6.90883 17.0912C8.25909 18.4414 10.0904 19.2 12 19.2V19.2Z"
                fill="white"
              />
            </svg>
          </button>
          {countAdded > 0 && (
            <>
              <span className="text-base font-bold text-white font-abhaya-libre">{countAdded}</span>
              <button
                className="w-[36px] h-[36px] rounded-lg bg-primary-9 flex items-center justify-center hover:bg-primary-10 active:bg-primary-11"
                onClick={handleClickDelete}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                    fill="white"
                  />
                </svg>
              </button>
            </>
          )}
        </motion.div>
      </div>

      <Link href={`/products/${slug}`}>
        <div className="flex flex-col justify-between p-3 pt-1 cursor-pointer">
          <div className="flex flex-col mb-2 gap-0">
            <p className="font-body text-primary-12 text-lg">{name}</p>
            <p className="font-body text-sage text-sm lowercase">{unit}</p>
          </div>
          <p className="font-body self-start text-primary-11">{price.toFixed(2)}$</p>
        </div>
      </Link>
    </div>
  );
}
