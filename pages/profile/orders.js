import axios from "axios";
import JsonPreviewer from "components/JsonPreviewer";
import MainLayout from "components/layout/MainLayout";
import OrderRow from "components/Order/OrderRow";
import { Button, Heading, LoadingSpinner, MainContainer, Text } from "components/ui";
import { Input } from "components/ui/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/order/myorders`, fetcher);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <>
      <MainContainer width="xl">
        <Heading>Your orders</Heading>
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>{!error && data?.orders.map((order, ind) => <OrderRow key={ind} order={order} />)}</>
        )}
      </MainContainer>
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
