import "styles/globals.css";
import { SessionProvider } from "next-auth/react";
import useShoppingCart from "components/ShoppingCart/useShoppingCart";

import { ShoppingCartProvider } from "components/ShoppingCart/ShoppingCartContext";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const url = `https://veggiesandfruits.com/${router.route}`;

  const shoppingCartProps = useShoppingCart();

  return (
    <SessionProvider session={session}>
      <ShoppingCartProvider value={shoppingCartProps}>
        <AnimatePresence exitBeforeEnter initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          {getLayout(<Component {...pageProps} key={url} />)}
        </AnimatePresence>
      </ShoppingCartProvider>
    </SessionProvider>
  );
}

export default MyApp;
