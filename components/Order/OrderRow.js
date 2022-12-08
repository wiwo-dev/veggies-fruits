import DeliveryIcon from "components/Checkout/DeliveryIcon";
import OrderSummary from "components/Checkout/OrderSummaryPanel";
import RightMoreArrowIcon from "components/Checkout/RightMoreArrowIcon";
import { BoxSection, BoxText, Input, Select } from "components/ui";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function OrderRow({ order }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (e) => {
    const { value } = e.target;

    const body = {
      id: order.id,
      status: value,
    };

    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const order = await response.json();
      console.log(order);
      //router.reload();
      await mutate(`${process.env.NEXT_PUBLIC_API_URL}/order`);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className="flex justify-between items-center p-3 rounded-md hover:bg-primary-4 hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-3">
          <div>
            <DeliveryIcon />
          </div>
          <div className="flex flex-col">
            <span className="text-sage font-body">
              Order ID: {order.id} || Status: {order.status} || Created:{" "}
              {new Date(order.createdAt).toLocaleString("pl-PL")}
            </span>
            <BoxText>
              {order.deliveryAddress.name} {order.deliveryAddress.address || ""}
              {order.deliveryAddress.address2 || ""}
            </BoxText>
            <BoxText>
              {order.deliveryAddress.postcode} {order.deliveryAddress.city} {order.deliveryAddress.country}
            </BoxText>
            <BoxText>
              {order.deliveryAddress.email} {order.deliveryAddress.phoneNumber}
            </BoxText>
          </div>
        </div>
        <div className={`p-5 rounded-lg transition-all ${isOpen && "rotate-180"}`}>
          <RightMoreArrowIcon />
        </div>
      </div>

      {isOpen && (
        <>
          <BoxSection>
            <OrderSummary cartItems={order.CartItems} />
          </BoxSection>
          <BoxSection>
            <Select label="Status" name="status" required defaultValue={order.status} onChange={handleStatusChange}>
              <option disabled value="">
                Choose status
              </option>
              <option value="NEW_SEND">NEW_SEND</option>
              <option value="SEND">SEND</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELED">CANCELED</option>
            </Select>
            <div className="h-[2px] w-full">
              {isLoading && (
                <motion.div
                  className="bg-primary-7 h-full"
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ repeat: Infinity, repeatType: "loop", duration: 1 }}></motion.div>
              )}
            </div>
          </BoxSection>
        </>
      )}

      <hr></hr>
    </div>
  );
}
