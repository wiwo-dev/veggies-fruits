/* eslint-disable @next/next/no-img-element */
import JsonPreviewer from "components/JsonPreviewer";
import Navbar from "components/Navbar";
import ProductCard from "components/ProductCard/ProductCard";
import AddToCardAnimation from "components/ui/AddToCardAnimation";
import Button from "components/ui/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRef } from "react";
import { MdShoppingCart } from "react-icons/md";

export default function Products({ products }) {
  const { data: session } = useSession();

  const cartRef = useRef();

  return (
    <>
      <Navbar />
      <JsonPreviewer>{products}</JsonPreviewer>
      <section className="flex w-full gap-3 mx-5 my-5">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </section>
      <AddToCardAnimation targetRef={cartRef}>
        <Button
          onClick={() => {
            console.log("TEST TEST CLICK");
          }}>
          Test
        </Button>
      </AddToCardAnimation>

      <div className="mt-[100px] ml-[100px]" ref={cartRef}>
        <MdShoppingCart />
      </div>
    </>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);
  const products = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products,
    },
  };
}
