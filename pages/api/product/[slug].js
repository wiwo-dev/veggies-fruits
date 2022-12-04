import prisma from "lib/prisma";
import slugify from "slugify";
import { getSession } from "next-auth/react";

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
    const product = await prisma.product.findUnique({
      where: { slug: req.query.slug },
      include: { categories: { select: { name: true, id: true } } },
    });
    res.json(product);
    return;
  }

  //checking persmissions - DELETE AND PUT ONLY FOR ADMIN
  const session = await getSession({ req });
  if (session?.dbUser.role !== "ADMIN") {
    console.log("NO PERMISSION");
    res.status(401).json({ orders: [], message: "NO PERMISSION" });
    return;
  }

  if (req.method === "DELETE") {
    console.log("DELETING ", req.query.slug);
    try {
      const product = await prisma.product.delete({
        where: { slug: req.query.slug },
      });
      console.log(`Deleted product: ${product.name}`);
      res.status(200).json(product);
      return;
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  }

  if (req.method === "PUT") {
    const { id, name, description, price, stockCount, category, mainPhotoUrl, unit } = JSON.parse(req.body);

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
    };

    try {
      const product = await prisma.product.update({
        where: { slug: req.query.slug },
        data,
      });
      console.log(`Updated product: ${product.name}`);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
}
