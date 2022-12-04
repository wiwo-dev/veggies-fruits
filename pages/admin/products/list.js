import AdminMenu from "components/admin/AdminMenu";
import ProductRow from "components/admin/ProductRow";
import AdminLayout from "components/layout/MainLayout copy";
import Navbar from "components/Navbar/Navbar";
import { Button } from "components/ui";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";

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
          <Link href="/admin/products/addproduct">
            <a>
              <Button>Add Product</Button>
            </a>
          </Link>
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
