import AdminMenu from "components/admin/AdminMenu";
import ProductRow from "components/admin/ProductRow";
import AdminLayout from "components/layout/AdminLayout";
import Navbar from "components/Navbar/Navbar";
import { Button, HorizontalRail, HorizontalRailItem, Input, LoadingSpinner, Text } from "components/ui";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { getSession } from "next-auth/react";
import HorizontalMenuLink from "components/admin/HorizontalMenuLink";
import Category from "components/Categories/Category";
import { CloseIcon } from "components/Icons/CloseIcon";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: products, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/product`, fetcher);
  const { data: categories } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/category`, fetcher);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

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
      <main className="max-w-screen-sm mx-auto px-[32px]">
        <div className="flex justify-center mb-5">
          <HorizontalMenuLink href="/admin/products/addproduct">
            <span className="flex items-center gap-3">Add Product</span>
          </HorizontalMenuLink>
        </div>
        {(!products || !categories) && (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        )}
        {products && categories && (
          <>
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
              <Text>
                {searchPhrase && `Searching for ${searchPhrase} ${selectedCategory && `in ${selectedCategory}`}`}
              </Text>
            </section>

            {filteredProducts &&
              filteredProducts.map((product, ind) => (
                <div key={ind}>
                  {/* <p>Product {ind}</p> */}
                  <ProductRow product={product} />
                  <hr></hr>
                </div>
              ))}
          </>
        )}
      </main>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session?.dbUser.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
