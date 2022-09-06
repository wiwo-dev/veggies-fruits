import "styles/globals.css";
import { SessionProvider } from "next-auth/react";
//import useShoppingCart from "components/ShoppingCart/useShoppingCart";

import { ECommerceProvider } from "components/ShoppingCart/ECommerceContext";
import { AnimatePresence } from "framer-motion";
import useECommerce from "components/ShoppingCart/useECommerce";

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const url = `https://veggiesandfruits.com/${router.route}`;

  const eCommerceProps = useECommerce();

  return (
    <SessionProvider session={session}>
      <ECommerceProvider value={eCommerceProps}>{getLayout(<Component {...pageProps} />)}</ECommerceProvider>
    </SessionProvider>
  );
}

export default MyApp;
