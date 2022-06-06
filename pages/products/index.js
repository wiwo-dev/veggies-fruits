/* eslint-disable @next/next/no-img-element */
import JsonPreviewer from "components/JsonPreviewer";
import Navbar from "components/Navbar";
import ProductCard from "components/ProductCard/ProductCard";
import AddToCardAnimation from "components/ui/AddToCardAnimation";
import Button from "components/ui/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRef, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import HorizontalRail from "components/HorizontalRail";
import LoadingSpinner from "components/ui/LoadingSpinner";

import useSWR from "swr";
import MainContainer from "components/ui/MainContainer";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Products({}) {
  const { data: session } = useSession();
  const cartRef = useRef();

  const [selectedCategory, setSelectedCategory] = useState();

  const { data: products, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/product${selectedCategory ? `?category=${selectedCategory}` : ""}`,
    fetcher
  );

  const { data: categories, error: errorCategories } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/category`, fetcher);

  return (
    <>
      <Navbar />
      {/* <JsonPreviewer>{products}</JsonPreviewer> */}
      <MainContainer>
        <HorizontalRail>
          {categories && (
            <>
              <span
                onClick={() => setSelectedCategory("")}
                className="min-w-[80px] text-center font-display text-primary-11">
                all
              </span>
              <span className="min-w-[10px] text-center font-display text-primary-11">|</span>
              {categories.map((category) => (
                <>
                  <span
                    onClick={() => setSelectedCategory(category.name)}
                    className={`min-w-[120px] text-center font-display ${
                      selectedCategory === category.name ? "text-primary-11" : "text-primary-10"
                    }`}>
                    {category.name}
                  </span>
                  <span className="min-w-[10px] text-center font-display text-primary-11">|</span>
                </>
              ))}
            </>
          )}

          <span className="min-w-[80px] text-center font-display text-primary-12">Diary</span>
          <span className="min-w-[10px] text-center font-display text-primary-12">|</span>
          <span className="min-w-[80px] text-center font-display text-primary-12">Veggies</span>
          <span className="min-w-[10px] text-center font-display text-primary-12">|</span>
          <span className="min-w-[80px] text-center font-display text-primary-12">Fruits</span>
          <span className="min-w-[10px] text-center font-display text-primary-12">|</span>
          <span className="min-w-[80px] text-center font-display text-primary-12">Diary</span>
        </HorizontalRail>
        <section className="flex flex-wrap w-full gap-3 my-5">
          {!error && !products ? (
            <div className="mx-auto mt-5">
              <LoadingSpinner />
            </div>
          ) : (
            products?.map((product, index) => (
              // <AddToCardAnimation targetRef={cartRef} key={index}>
              <ProductCard key={index} product={product} />
              // </AddToCardAnimation>
            ))
          )}
        </section>
        <section>
          {/* <AddToCardAnimation targetRef={cartRef}>
          <Button
          onClick={() => {
            console.log("TEST TEST CLICK");
          }}>
          Test
          </Button>
          </AddToCardAnimation>
          
          <div className="mt-[100px] ml-[100px]" ref={cartRef}>
          <MdShoppingCart />
        </div> */}
        </section>
      </MainContainer>
    </>
  );
}

//import prisma from "lib/prisma";

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);
//   //const products = await res.json();

//   const category = "";
//   const products = await prisma.product.findMany({
//     //where: { published: true },
//     where: category ? { categories: { some: { name: { equals: category } } } } : {},
//     include: { categories: { select: { name: true, id: true } } },
//   });

//   const simplifiedProducts = products.map((product) => ({
//     name: product.name,
//     description: product.description,
//     mainPhotoUrl: product.mainPhotoUrl,
//     slug: product.slug,
//   }));

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       products: simplifiedProducts,
//     },
//   };
// }
