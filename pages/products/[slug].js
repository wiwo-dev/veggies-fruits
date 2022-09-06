import JsonPreviewer from "components/JsonPreviewer";
import MainLayout from "components/layout/MainLayout";
import Navbar from "components/Navbar/Navbar";
import { ECommerceContext } from "components/ShoppingCart/ECommerceContext";
import { Heading, MainContainer, Text } from "components/ui";

export default function Page({ product }) {
  const [quantity, setQuantity] = useState(0);
  const { cartItems, productsCount, totalPrice, addProduct, removeProduct, removeAllProducts } =
    useContext(ECommerceContext);

  useEffect(() => {
    const found = cartItems.find((item) => item.productId === product.id);
    if (found) setQuantity(found.quantity);
    else setQuantity(0);
  }, [cartItems]);

  const handleClickPlus = () => {
    setQuantity(quantity + 1);
    addProduct({ product });
  };

  const handleClickDelete = () => {
    setQuantity(0);
    removeAllProducts({ product });
  };

  return (
    <>
      <MainContainer width="xl">
        <div className="flex justify-between mt-5">
          <div className="max-w-[250px] flex flex-col justify-center gap-2">
            <Heading>{product.name}</Heading>
            <p className="font-body text-sm text-sage">unit: {product.unit}</p>
            <p className="font-body text-lg text-primary-11">{product.price}$</p>
            <div className="flex justify-start items-center gap-5">
              <div className="">
                <div className="mx-auto w-fit h-[36px] bg-primary-9 flex flex-row items-center justify-between rounded-full px-0 shadom-md right-[-8px] top-[-8px] transition-transform">
                  <RemoveProductButton
                    onClick={() => {
                      removeProduct({ product });
                    }}
                  />
                  <span className="text-base font-bold text-white font-abhaya-libre">{quantity}</span>
                  <AddProductButton
                    onClick={() => {
                      addProduct({ product });
                    }}
                  />
                </div>
              </div>
              <span className="font-abhaya-libre text-primary-11 text-lg">
                {" "}
                {(product.price * quantity).toFixed(2)}$
              </span>
              <RemoveAllButton
                onClick={() => {
                  removeAllProducts({ product });
                }}
              />
            </div>
          </div>
          <Image
            src={`${product.mainPhotoUrl}?q=100&w=300&h=200`}
            width="300px"
            height="200px"
            className="object-cover w-[300px] h-[200px] rounded-md"
            alt={product.name}
          />
        </div>
        <div className="h-[50px]"></div>
        <Text>{product.description}</Text>

        {/* <JsonPreviewer>{product}</JsonPreviewer> */}
      </MainContainer>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticPaths() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);
  // const products = await res.json();

  const category = "";
  const products = await prisma.product.findMany({
    //where: { published: true },
    where: category ? { categories: { some: { name: { equals: category } } } } : {},
    include: { categories: { select: { name: true, id: true } } },
  });

  const paths = products.map((product) => ({ params: { slug: `${product.slug}` } }));
  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}

import prisma from "lib/prisma";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the product `id`.
  // If the route is like /products/1, then params.id is 1
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${params.slug}`);
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { categories: { select: { name: true, id: true } } },
  });
  //const product = await res.json();

  // Pass post data to the page via props
  return {
    props: {
      product: {
        name: product.name,
        id: product.id,
        description: product.description,
        mainPhotoUrl: product.mainPhotoUrl,
        price: product.price,
        unit: product.unit,
      },
    },
  };
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
