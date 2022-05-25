import prisma from "lib/prisma";

export default async function handle(req, res) {
  if (req.method === "GET") {
    const productCount = await prisma.product.count();
    res.json(productCount);
  } else {
    res.send("Only GET requests are supported");
  }
}
