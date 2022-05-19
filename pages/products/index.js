import JsonPreviewer from "components/JsonPreviewer";
import Navbar from "components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Products({ products }) {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <JsonPreviewer>{products}</JsonPreviewer>
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
