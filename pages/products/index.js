/* eslint-disable @next/next/no-img-element */

import ProductCard from "components/ProductCard/ProductCard";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRef, useState } from "react";
import HorizontalRail from "components/ui/HorizontalRail/HorizontalRail";
import LoadingSpinner from "components/ui/LoadingSpinner";
import useSWR from "swr";
import MainContainer from "components/ui/MainContainer";
import MainLayout from "components/layout/MainLayout";
import HorizontalRailItem from "components/ui/HorizontalRail/HorizontalRailItem";
import Category from "components/Categories/Category";
import { Input } from "components/ui/form";
import { Text } from "components/ui";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function Products({}) {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: products, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/product${selectedCategory ? `?category=${selectedCategory}` : ""}`,
    fetcher
  );
  const { data: categories, error: errorCategories } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/category`, fetcher);

  const [searchPhrase, setSearchPhrase] = useState("");

  return (
    <>
      {/* <JsonPreviewer>{products}</JsonPreviewer> */}
      <MainContainer width="xl" className="bg-primary-1">
        <HorizontalRail gap={3} height={100}>
          {categories && (
            <>
              <button onClick={() => setSelectedCategory("")} className="">
                <HorizontalRailItem>
                  <Category label="All" icon="shopping-basket" active={selectedCategory === "" && true} />
                </HorizontalRailItem>
              </button>
              {categories.map((category, index) => (
                <button key={index} onClick={() => setSelectedCategory(category.name)}>
                  <HorizontalRailItem>
                    <Category
                      label={capitalizeFirstLetter(category.name)}
                      icon={category.icon}
                      active={selectedCategory === category.name && true}
                    />
                  </HorizontalRailItem>
                </button>
              ))}
            </>
          )}
        </HorizontalRail>
        <section>
          <Input onChange={(e) => setSearchPhrase(e.target.value)}></Input>
          <Text>{searchPhrase && `Searching for ${searchPhrase} ${selectedCategory && `in ${selectedCategory}`}`}</Text>
        </section>
        <section className="flex flex-wrap w-full justify-start gap-3 my-5">
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

Products.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

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
