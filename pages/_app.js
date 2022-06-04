import "styles/globals.css";
import { SessionProvider } from "next-auth/react";
import useShoppingCart from "components/ShoppingCart/useShoppingCart";

import { ShoppingCartProvider } from "components/ShoppingCart/ShoppingCartContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const shoppingCartProps = useShoppingCart();

  return (
    <SessionProvider session={session}>
      <ShoppingCartProvider value={shoppingCartProps}>
        <Component {...pageProps} />
      </ShoppingCartProvider>
    </SessionProvider>
  );
}

export default MyApp;
