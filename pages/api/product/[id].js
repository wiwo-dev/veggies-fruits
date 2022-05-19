import prisma from "lib/prisma";

export default async function handle(req, res) {
  if (req.method === "GET") {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.query.id) },
      include: { categories: { select: { name: true, id: true } } },
    });
    res.json(product);
  } else {
    res.send("Only GET requests are supported");
  }
}
