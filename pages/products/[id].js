import JsonPreviewer from "components/JsonPreviewer";
import Navbar from "components/Navbar";

export default function ({ product }) {
  return (
    <>
      <Navbar />
      <h1>Name: {product.name}</h1>
      <p>Description: {product.description}</p>
      <img src={`${product.mainPhotoUrl}`} alt={product.name} />
      <JsonPreviewer>{product}</JsonPreviewer>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);
  const products = await res.json();

  const paths = products.map((product) => ({ params: { id: `${product.id}` } }));
  return {
    paths,
    fallback: true, // false or 'blocking'
  };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the product `id`.
  // If the route is like /products/1, then params.id is 1
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${params.id}`);
  const product = await res.json();

  // Pass post data to the page via props
  return { props: { product } };
}
