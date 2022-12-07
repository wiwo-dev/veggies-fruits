import AdminMenu from "components/admin/AdminMenu";
import ProductRow from "components/admin/ProductRow";
import AdminLayout from "components/layout/AdminLayout";
import Navbar from "components/Navbar/Navbar";
import { Button } from "components/ui";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

import { getSession } from "next-auth/react";
import HorizontalMenuLink from "components/admin/HorizontalMenuLink";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: products, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/product${selectedCategory ? `?category=${selectedCategory}` : ""}`,
    fetcher
  );
  return (
    <>
      <main className="max-w-screen-sm mx-auto px-[32px]">
        <div className="flex justify-center">
          <HorizontalMenuLink href="/admin/products/addproduct">
            <span className="flex items-center gap-3">Add Product</span>
          </HorizontalMenuLink>
        </div>

        <p>Here are your products</p>
        {!products && <p>Loading...</p>}
        {products &&
          products.map((product, ind) => (
            <div key={ind}>
              {/* <p>Product {ind}</p> */}
              <ProductRow product={product} />
              <hr></hr>
            </div>
          ))}
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
