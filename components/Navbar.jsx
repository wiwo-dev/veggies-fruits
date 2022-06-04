import { useSession, signIn, signOut } from "next-auth/react";
import { useContext } from "react";
import { ShoppingCartContext } from "./ShoppingCart/ShoppingCartContext";
import JsonPreviewer from "./JsonPreviewer";
import Link from "next/link";

export default function Navbar() {
  const { cartItemsCount, cartItems } = useContext(ShoppingCartContext);

  const { data: session } = useSession();
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full h-10 px-4 text-white bg-primary-9">
        <Link href="/">
          <a>Veggies & Fruits</a>
        </Link>

        <Link href="/products">
          <a>Products</a>
        </Link>

        <div className="flex gap-5">
          {session ? (
            <>
              <div>
                Signed in as {session.user?.email} | <button onClick={() => signOut()}>Sign out</button>
              </div>
            </>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
          <Link href="/cart">
            <a>Cart items: {cartItems.length}</a>
          </Link>
        </div>
      </div>
    </>
  );
}
