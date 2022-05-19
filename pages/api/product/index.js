import prisma from "lib/prisma";

export default async function handle(req, res) {
  if (req.method === "GET") {
    const { category } = req.query;
    const posts = await prisma.product.findMany({
      //where: { published: true },
      where: category ? { categories: { some: { name: { equals: category } } } } : {},
      include: { categories: { select: { name: true, id: true } } },
    });
    res.json(posts);
  }

  if (req.method === "POST") {
    const { name, description, published, stockCount, categories, mainPhotoUrl, available } = req.body;
    const data = {
      name,
      description,
      categories: categories
        ? {
            connect: categories.map((category) => ({
              id: category.id,
            })),
          }
        : {},
      //categories,
    };
    const product = await prisma.product.create({ data });
    console.log(`Added product: ${product.name}`);
    res.json(product);
  }

  if (req.method === "PUT") {
    const { id, name, description, published, stockCount, categories, mainPhotoUrl, available } = req.body;
    const data = {
      name,
      description,
      // categories: {
      //   connect: categories.map((category) => ({
      //     id: category.id,
      //   })),
      // },
      //categories,
    };
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data,
    });
    console.log(`Updated product: ${product.name}`);
    res.json(product);
  }
}
