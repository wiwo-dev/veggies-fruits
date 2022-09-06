import { Button } from "components/ui";
import { BoxHeading, BoxText } from "components/ui/BoxSection";
import { Input, Select } from "components/ui/form";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import DeliveryIcon from "./DeliveryIcon";
import PickUpIcon from "./PickUpIcon";
import RightMoreArrowIcon from "./RightMoreArrowIcon";

export default function DeliveryPanel({ deliveryAddress, setDeliveryAddress }) {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [chooseDeliveryOptionOpen, setChooseDeliveryOptionOpen] = useState(false);

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    setDeliveryAddress({
      ...deliveryAddress,
      [evt.target.name]: value,
    });
  };

  const handleSaveClick = () => {
    //form validation
    const copy = { ...deliveryAddress };
    // for (let pos in copy) {
    //   //pos - name
    //   //copy[pos] - value

    //   console.log(`Testing: ${pos} : ${copy[pos]} ---> ${regex[pos].test(copy[pos])}`);
    // }

    //to close delivery option dropdown modal
    setChooseDeliveryOptionOpen(false);
  };

  function DeliveryBox({ icon, heading, text, onClick, isSelected }) {
    return (
      <div
        className={`flex flex-col items-center gap-3 rounded-lg p-2 border-2 bg-primary-3 hover:bg-primary-4 hover:cursor-pointer ${
          isSelected ? "border-primary-6" : "border-primary-2"
        }`}
        onClick={onClick}>
        {icon}
        <div className="flex flex-col items-center">
          <BoxHeading>{heading}</BoxHeading>
          <BoxText>{text}</BoxText>
        </div>
      </div>
    );
  }

  function DeliveryShortenedPanel({ icon, heading, lines }) {
    return (
      <div
        className="flex justify-between items-center p-3 rounded-md hover:bg-primary-4 hover:cursor-pointer"
        onClick={() => setChooseDeliveryOptionOpen(!chooseDeliveryOptionOpen)}>
        <div className="flex items-center gap-3">
          <div>{icon}</div>
          <div className="flex flex-col">
            <span className="text-sage font-body">{heading}</span>
            {lines.map((line, index) => (
              <BoxText key={index}>{line}</BoxText>
            ))}
          </div>
        </div>
        <div className={`p-5 rounded-lg transition-all ${chooseDeliveryOptionOpen && "rotate-180"}`}>
          <RightMoreArrowIcon />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-primary-11 font-body">Delivery</div>
      <div className="text-sage font-body text-sm">How would you like us to deliver your order?</div>
      {deliveryMethod === "delivery" ? (
        <DeliveryShortenedPanel
          icon={<DeliveryIcon />}
          heading={"To Your address"}
          lines={
            deliveryAddress
              ? [
                  `${deliveryAddress.name} ${deliveryAddress.address || ""} ${deliveryAddress.address2 || ""}`,
                  `${deliveryAddress.postcode} ${deliveryAddress.city}, ${deliveryAddress.country}`,
                  `${deliveryAddress.email} ${deliveryAddress.phoneNumber}`,
                ]
              : ["No address"]
          }
        />
      ) : deliveryMethod === "pickup" ? (
        <DeliveryShortenedPanel
          icon={<PickUpIcon />}
          heading={"Self pick up"}
          lines={["Pick your order at our shop"]}
        />
      ) : (
        ""
      )}

      <AnimatePresence>
        {chooseDeliveryOptionOpen && (
          <motion.section
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}>
            <section className="">
              <div className="text-primary-11 font-body">Choose delivery option</div>
              <div className="flex justify-between items-center p-5">
                <DeliveryBox
                  heading={"Delivery"}
                  text={"We will deliver to your address"}
                  isSelected={deliveryMethod === "delivery"}
                  onClick={() => setDeliveryMethod("delivery")}
                  icon={<DeliveryIcon />}
                />
                <DeliveryBox
                  heading={"Self pickup"}
                  text={"Pick your order at our shop"}
                  isSelected={deliveryMethod === "pickup"}
                  onClick={() => {
                    setDeliveryMethod("pickup");
                    setChooseDeliveryOptionOpen(false);
                  }}
                  icon={<PickUpIcon />}
                />
              </div>
            </section>
            <AnimatePresence initial={false}>
              {deliveryMethod === "delivery" && (
                <motion.section
                  className=""
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}>
                  <div className="text-primary-11 font-body">Your address</div>
                  <form className="">
                    <Input
                      label="Name and surname"
                      type="text"
                      name="name"
                      value={deliveryAddress?.name || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Address"
                      type="text"
                      name="address"
                      value={deliveryAddress?.address || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Address 2. line"
                      type="text"
                      name="address2"
                      value={deliveryAddress?.address2 || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="City"
                      type="text"
                      name="city"
                      value={deliveryAddress?.city || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Postcode"
                      type="text"
                      name="postcode"
                      value={deliveryAddress?.postcode || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Country"
                      type="text"
                      name="country"
                      value={deliveryAddress?.country || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Phone"
                      type="text"
                      name="phone"
                      value={deliveryAddress?.phone || ""}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Email"
                      type="text"
                      name="email"
                      value={deliveryAddress?.email || ""}
                      onChange={handleInputChange}
                    />
                  </form>
                  <div className="flex justify-center">
                    <Button type="submit" loading={false} onClick={handleSaveClick}>
                      Save
                    </Button>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
            <section className="bg-primary-2 p-3"></section>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
