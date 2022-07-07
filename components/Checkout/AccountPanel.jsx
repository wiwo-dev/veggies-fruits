import { ECommerceContext } from "components/ShoppingCart/ECommerceContext";
import { useContext, useState } from "react";
import AccountIcon from "./AccountIcon";
import NoAccountIcon from "./NoAccountIcon";
import RightMoreArrowIcon from "./RightMoreArrowIcon";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function AccountPanel() {
  const { cartItems, productsCount, totalPrice, addProduct, removeProduct, removeAllProducts } =
    useContext(ECommerceContext);
  const [accountMethod, setAccountMethod] = useState("noaccount");
  const [chooseAccountOptionOpen, setChooseAccountOptionOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) setAccountMethod("account");
  }, [session]);

  function AccountBox({ icon, heading, text, onClick, isSelected }) {
    return (
      <div
        className={`flex flex-col w-[200px] items-center gap-3 rounded-lg p-2 border-2 bg-primary-3 hover:bg-primary-4 hover:cursor-pointer ${
          isSelected ? "border-primary-6" : "border-primary-2"
        }`}
        onClick={onClick}>
        {icon}
        <div className="flex flex-col items-center">
          <div className="text-sage font-body text-base">{heading}</div>
          <div className="text-sage font-body text-center text-sm">{text}</div>
        </div>
      </div>
    );
  }

  function AccountShortenedPanel({ icon, heading, lines, onClick, withIcon }) {
    return (
      <section
        className="flex justify-between items-center p-3 rounded-md hover:bg-primary-4 hover:cursor-pointer"
        onClick={() => setChooseAccountOptionOpen(!chooseAccountOptionOpen)}>
        <div className="flex items-center gap-3">
          <div onClick={onClick}>{icon}</div>
          <div className="flex flex-col">
            <div className="text-sage font-body text-base">{heading}</div>
            {lines.map((line, index) => (
              <div key={index} className="text-sage font-body text-sm">
                {line}
              </div>
            ))}
          </div>
        </div>
        {withIcon && (
          <div className={`p-5 rounded-lg transition-all ${chooseAccountOptionOpen && "rotate-180"}`}>
            <RightMoreArrowIcon />
          </div>
        )}
      </section>
    );
  }

  if (status === "loading") {
    return (
      <>
        <div className="text-primary-11 font-body">Loading...</div>
        {/* <div className="text-sage font-body text-sm">Login to your account or order without creating an account.</div> */}
      </>
    );
  }

  if (!session) {
    return (
      <>
        <div className="text-primary-11 font-body">Account {status}</div>
        <div className="text-sage font-body text-sm">Login to your account or order without creating an account.</div>

        <section className="">
          <div className="flex justify-between items-center p-5">
            <AccountBox
              icon={<AccountIcon />}
              heading={"Account"}
              text={session ? session?.token.email : "Login or create an account"}
              onClick={() => {
                setAccountMethod("account");
                !session && signIn();
              }}
              isSelected={accountMethod === "account"}
            />
            <AccountBox
              icon={<NoAccountIcon />}
              heading={"No account"}
              text={"Order without the account"}
              onClick={() => setAccountMethod("noaccount")}
              isSelected={accountMethod === "noaccount"}
            />
          </div>
        </section>
      </>
    );
  } else {
    return (
      <>
        <div className="text-primary-11 font-body">Account</div>
        <div className="text-sage font-body text-sm">You are logged in as {session?.token.email}</div>
      </>
    );
  }
}
