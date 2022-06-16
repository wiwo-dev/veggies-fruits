import { Button } from "components/ui";
import { Input, Select } from "components/ui/form";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import DeliveryIcon from "./DeliveryIcon";
import PickUpIcon from "./PickUpIcon";
import RightMoreArrowIcon from "./RightMoreArrowIcon";

import { regex } from "components/Checkout/RegexValidation";
import OrderSummary from "./OrderSummary";

export default function DeliveryPanel() {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [deliveryAddress, setDeliveryAddress] = useState();
  const [deliveryAddressObject, setDeliveryAddressObject] = useState();

  function handleInputChange(evt) {
    const value = evt.target.value;
    setDeliveryAddress({
      ...deliveryAddress,
      [evt.target.name]: value,
    });

    // setDeliveryAddressObject({
    //   ...deliveryAddressObject,
    //   [evt.target.name]: { value, error: deliveryAddressObject[evt.target.name].error || "no error" },
    // });
  }

  const [chooseDeliveryOptionOpen, setChooseDeliveryOptionOpen] = useState(false);

  const handleSaveClick = () => {
    //form validation
    const copy = { ...deliveryAddress };
    for (let pos in copy) {
      //pos - name
      //copy[pos] - value

      console.log(`Testing: ${pos} : ${copy[pos]} ---> ${regex[pos].test(copy[pos])}`);
    }

    //to close delivery option dropdown modal
    setChooseDeliveryOptionOpen(false);
  };

  return (
    <main className="bg-primary-2 p-3">
      <section className="">
        <div className="text-primary-11 font-body">Delivery</div>
        <div
          className="flex justify-between items-center p-3 rounded-md hover:bg-primary-4 hover:cursor-pointer"
          onClick={() => setChooseDeliveryOptionOpen(!chooseDeliveryOptionOpen)}>
          <div className="flex items-center gap-3">
            <div onClick={() => {}}>
              {deliveryMethod === "delivery" ? <DeliveryIcon /> : deliveryMethod === "pickup" ? <PickUpIcon /> : "NONE"}
            </div>
            <div className="flex flex-col">
              <div className="text-sage font-body text-base">
                {deliveryMethod === "delivery"
                  ? "To Your address"
                  : deliveryMethod === "pickup"
                  ? "Self pick up"
                  : "NONE"}
              </div>
              <div className="text-sage font-body text-sm">
                {deliveryMethod === "delivery"
                  ? deliveryAddress
                    ? `${deliveryAddress.name} ${deliveryAddress.address} ${deliveryAddress.city}`
                    : "Set address"
                  : deliveryMethod === "pickup"
                  ? "Pick your order at our shop"
                  : "NONE"}
              </div>
            </div>
          </div>
          <div className={`p-5 rounded-lg transition-all ${chooseDeliveryOptionOpen && "rotate-180"}`}>
            <RightMoreArrowIcon />
          </div>
        </div>
      </section>

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
                <div
                  className={`flex flex-col items-center gap-3 rounded-lg p-2 border-2 bg-primary-3 hover:bg-primary-4 hover:cursor-pointer ${
                    deliveryMethod === "delivery" ? "border-primary-6" : "border-primary-2"
                  }`}
                  onClick={() => setDeliveryMethod("delivery")}>
                  <DeliveryIcon />
                  <div className="flex flex-col items-center">
                    <div className="text-sage font-body text-base">Delivery</div>
                    <div className="text-sage font-body text-center text-sm">We will deliver to your address</div>
                  </div>
                </div>
                <div
                  className={`flex flex-col items-center gap-3 rounded-lg p-2 border-2 bg-primary-3 hover:bg-primary-4 hover:cursor-pointer ${
                    deliveryMethod === "pickup" ? "border-primary-6" : "border-primary-2"
                  }`}
                  onClick={() => setDeliveryMethod("pickup")}>
                  <PickUpIcon />
                  <div className="flex flex-col items-center">
                    <div className="text-sage font-body text-base">Self pick up</div>
                    <div className="text-sage font-body text-center text-sm">Pick your order at our shop</div>
                  </div>
                </div>
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
                    <Input label="Name and surname" type="text" name="name" required onChange={handleInputChange} />
                    <Input label="Address" type="text" name="address" required onChange={handleInputChange} />
                    <Input label="Address 2. line" type="text" name="address2" required onChange={handleInputChange} />
                    <Input label="City" type="text" name="city" required onChange={handleInputChange} />
                    <Input label="Postcode" type="text" name="postcode" required onChange={handleInputChange} />
                    <Input label="Country" type="text" name="country" required onChange={handleInputChange} />
                    <Input label="Phone" type="text" name="phone" required onChange={handleInputChange} />

                    {/* <div className="mt-3 flex justify-center">
                <Button type="submit" loading={false}>
                  Save address
                </Button>
              </div> */}
                  </form>
                </motion.section>
              )}
            </AnimatePresence>
            <section className="bg-primary-2 p-3">
              <div className="flex justify-center">
                <Button type="submit" loading={false} onClick={handleSaveClick}>
                  Save
                </Button>
              </div>
            </section>
          </motion.section>
        )}
      </AnimatePresence>
      <OrderSummary />
    </main>
  );
}
