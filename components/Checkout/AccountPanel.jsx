import { ECommerceContext } from "components/ShoppingCart/ECommerceContext";
import { useContext, useState } from "react";
import AccountIcon from "./AccountIcon";
import NoAccountIcon from "./NoAccountIcon";
import RightMoreArrowIcon from "./RightMoreArrowIcon";

export default function AccountPanel() {
  const { cartItems, productsCount, totalPrice, addProduct, removeProduct, removeAllProducts } =
    useContext(ECommerceContext);

  const [accountMethod, setAccountMethod] = useState("noaccount");
  const [chooseAccountOptionOpen, setChooseAccountOptionOpen] = useState(false);

  return (
    <>
      <div className="text-primary-11 font-body">Account</div>
      <div className="text-sage font-body text-sm">Login to your account or order without creating an account.</div>
      <div
        className="flex justify-between items-center p-3 rounded-md hover:bg-primary-4 hover:cursor-pointer"
        onClick={() => setChooseAccountOptionOpen(!chooseAccountOptionOpen)}>
        <div className="flex items-center gap-3">
          <div onClick={() => {}}>
            {accountMethod === "noaccount" ? <NoAccountIcon /> : accountMethod === "account" ? <AccountIcon /> : "NONE"}
          </div>
          <div className="flex flex-col">
            <div className="text-sage font-body text-base">
              {accountMethod === "noaccount"
                ? "Order without the account"
                : accountMethod === "account"
                ? "Account"
                : "NONE"}
            </div>
            <div className="text-sage font-body text-sm">
              {accountMethod === "account"
                ? "youremail@email.com"
                : accountMethod === "noaccount"
                ? "Order without the account"
                : "NONE"}
            </div>
          </div>
        </div>
        <div className={`p-5 rounded-lg transition-all ${chooseAccountOptionOpen && "rotate-180"}`}>
          <RightMoreArrowIcon />
        </div>
      </div>
      <section className="">
        <div className="flex justify-between items-center p-5">
          <div
            className={`flex flex-col items-center gap-3 rounded-lg p-2 border-2 bg-primary-3 hover:bg-primary-4 hover:cursor-pointer ${
              accountMethod === "noaccount" ? "border-primary-6" : "border-primary-2"
            }`}
            onClick={() => setAccountMethod("noaccount")}>
            <NoAccountIcon />
            <div className="flex flex-col items-center">
              <div className="text-sage font-body text-base">No acount</div>
              <div className="text-sage font-body text-center text-sm">Order without the account</div>
            </div>
          </div>
          <div
            className={`flex flex-col items-center gap-3 rounded-lg p-2 border-2 bg-primary-3 hover:bg-primary-4 hover:cursor-pointer ${
              accountMethod === "account" ? "border-primary-6" : "border-primary-2"
            }`}
            onClick={() => setAccountMethod("account")}>
            <AccountIcon />
            <div className="flex flex-col items-center">
              <div className="text-sage font-body text-base">Account</div>
              <div className="text-sage font-body text-center text-sm">Login or create an account</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
