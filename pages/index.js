/* eslint-disable @next/next/no-img-element */

import ProductCard from "components/ProductCard/ProductCard";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
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

export default function Products({ products, categories }) {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(products);

  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    if (selectedCategory && searchPhrase) {
      setFilteredProducts(
        products
          .filter((prod) => prod.categories.filter((cat) => cat.name === selectedCategory).length > 0)
          .filter((prod) => prod.name.toLowerCase().includes(searchPhrase.toLowerCase()))
      );
    } else if (searchPhrase) {
      setFilteredProducts(products.filter((prod) => prod.name.toLowerCase().includes(searchPhrase.toLowerCase())));
    } else if (selectedCategory) {
      setFilteredProducts(
        products.filter((prod) => prod.categories.filter((cat) => cat.name === selectedCategory).length > 0)
      );
    } else setFilteredProducts(products);
  }, [selectedCategory, searchPhrase]);

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
        <section className="max-w-screen-xs mx-auto">
          <div className="relative">
            <Input onChange={(e) => setSearchPhrase(e.target.value)} value={searchPhrase}></Input>
            <div
              className="absolute right-4 top-0 bottom-0 flex justify-center items-center"
              onClick={() => setSearchPhrase("")}>
              <CloseIcon fill="#297c3b" />
            </div>
          </div>
          <Text>{searchPhrase && `Searching for ${searchPhrase} ${selectedCategory && `in ${selectedCategory}`}`}</Text>
        </section>
        {/* <section className="flex flex-wrap justify-around gap-3 my-5"> */}
        <section className="grid justify-items-center grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 my-5">
          {!products ? (
            <div className="mx-auto mt-5">
              <p>no products...</p>
            </div>
          ) : (
            filteredProducts?.map((product, index) => (
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

import prisma from "lib/prisma";
import { CloseIcon } from "components/Icons/CloseIcon";

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);
  //const products = await res.json();

  const category = "";
  const products = await prisma.product.findMany({
    //where: { published: true },
    where: category ? { categories: { some: { name: { equals: category } } } } : {},
    include: { categories: { select: { name: true, id: true } } },
  });

  const simplifiedProducts = products.map((product) => ({
    name: product.name,
    price: product.price,
    description: product.description,
    mainPhotoUrl: product.mainPhotoUrl,
    slug: product.slug,
    unit: product.unit,
    id: product.id,
    categories: product.categories,
  }));

  const categories = await prisma.category.findMany();

  const simplifiedCategories = categories.map((category) => ({
    name: category.name,
    icon: category.icon,
    id: category.id,
  }));

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products: simplifiedProducts,
      categories: simplifiedCategories,
    },
    revalidate: 30,
  };
}
