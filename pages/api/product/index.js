import prisma from "lib/prisma";
import slugify from "slugify";
import { getSession } from "next-auth/react";

prisma.$use(async (params, next) => {
  //use this if want to check the slug on update
  //(params.action === "create" || params.action === "update")
  if (params.action === "create" && ["Category", "Product"].includes(params.model)) {
    let {
      args: { data },
    } = params;
    // Check if slug exists by `findUnique` (did not test)
    let newSlug = slugify(`${data.name}`, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });
    const product = await prisma.product.findUnique({
      where: { slug: newSlug },
    });
    if (product) {
      newSlug = `${newSlug}-${product.id}`;
      console.log("SLUG EXISTS");
    }
    console.log("CREATED A SLUG: ", newSlug);
    data.slug = newSlug;
  }
  const result = await next(params);
  return result;
});

// to login the action
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
  return result;
});

export default async function handle(req, res) {
  if (req.method === "GET") {
    const { category } = req.query;
    const products = await prisma.product.findMany({
      //where: { published: true },
      where: category ? { categories: { some: { name: { equals: category } } } } : {},
      include: { categories: { select: { name: true, id: true } } },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(products);
    return;
  }

  const session = await getSession({ req });
  if (session?.dbUser.role !== "ADMIN") {
    console.log("NO PERMISSION");
    res.status(401).json({ orders: [], message: "NO PERMISSION" });
    return;
  }

  if (req.method === "POST") {
    console.log("BODY");
    console.log(req.body);
    console.log(JSON.stringify(req.body, null, 2));
    //const parsedBody = JSON.parse(req.body)
    const { name, description, published, price, stockCount, category, mainPhotoUrl, unit, available } = JSON.parse(
      req.body
    );
    const data = {
      name,
      description,
      stockCount: Number(stockCount),
      price: Number(price),
      mainPhotoUrl,
      unit,
      available: Number(stockCount) > 0 ? true : false,
      categories: category
        ? {
            connect: [{ id: Number(category) }],
          }
        : {},
      //categories,
    };
    const product = await prisma.product.create({ data });
    console.log(`Added product: ${product.name}`);
    res.json(product);
  }

  // if (req.method === "PUT") {
  //   const { id, name, description, price, stockCount, category, mainPhotoUrl, unit } = JSON.parse(req.body);

  //   const data = {
  //     name,
  //     description,
  //     stockCount: Number(stockCount),
  //     price: Number(price),
  //     mainPhotoUrl,
  //     unit,
  //     available: Number(stockCount) > 0 ? true : false,
  //     categories: category
  //       ? {
  //           connect: [{ id: Number(category) }],
  //         }
  //       : {},
  //   };

  //   try {
  //     const product = await prisma.product.update({
  //       where: { id: Number(id) },
  //       data,
  //     });
  //     console.log(`Updated product: ${product.name}`);
  //     res.status(200).json(product);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500);
  //   }
  // }
}
