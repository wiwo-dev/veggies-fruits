import JsonPreviewer from "components/JsonPreviewer";
import Navbar from "components/Navbar/Navbar";

export default function Page({ product }) {
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
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);
  // const products = await res.json();

  const category = "";
  const products = await prisma.product.findMany({
    //where: { published: true },
    where: category ? { categories: { some: { name: { equals: category } } } } : {},
    include: { categories: { select: { name: true, id: true } } },
  });

  const paths = products.map((product) => ({ params: { slug: `${product.slug}` } }));
  return {
    paths,
    fallback: false, // false or 'blocking'
  };
}

import prisma from "lib/prisma";
// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the product `id`.
  // If the route is like /products/1, then params.id is 1
  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${params.slug}`);
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { categories: { select: { name: true, id: true } } },
  });
  //const product = await res.json();

  // Pass post data to the page via props
  return {
    props: {
      product: {
        name: product.name,
        description: product.description,
        mainPhotoUrl: product.mainPhotoUrl,
      },
    },
  };
}
