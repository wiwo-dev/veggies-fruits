import "styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { ECommerceProvider } from "components/ShoppingCart/ECommerceContext";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      <ECommerceProvider>{getLayout(<Component {...pageProps} />)}</ECommerceProvider>
    </SessionProvider>
  );
}

export default MyApp;
