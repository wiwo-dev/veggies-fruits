import prisma from "lib/prisma";

export default async function handle(req, res) {
  if (req.method === "GET") {
    const product = await prisma.product.findUnique({
      where: { slug: req.query.slug },
      include: { categories: { select: { name: true, id: true } } },
    });
    res.json(product);
  } else {
    res.send("Only GET requests are supported");
  }
}
