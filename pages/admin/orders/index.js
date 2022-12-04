import AdminMenu from "components/admin/AdminMenu";
import OrderSummary from "components/Checkout/OrderSummaryPanel";
import OrderRow from "components/Order/OrderRow";
import Navbar from "components/Navbar/Navbar";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import useSWR from "swr";
import JsonPreviewer from "components/JsonPreviewer";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
  const { data: session } = useSession();
  const { data: orders, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/order`, fetcher);

  return (
    <>
      <Navbar />
      <AdminMenu />
      <main className="max-w-screen-md mx-auto px-[32px]">
        {!orders && <p>Loading...</p>}
        {!error && orders?.orders.map((order, ind) => <OrderRow key={ind} order={order} />)}
      </main>
    </>
  );
}
