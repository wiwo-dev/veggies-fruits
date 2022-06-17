import prisma from "lib/prisma";

export default async function handle(req, res) {
  if (req.method === "GET") {
    const { category } = req.query;
    const orders = await prisma.order.findMany({
      include: { CartItems: { include: { product: true } } },
    });
    res.json(orders);
  }

  if (req.method === "POST") {
    const { status, CartItems } = req.body;
    console.log(JSON.stringify(CartItems, null, 2));
    const data = {
      CartItems: CartItems
        ? {
            create: CartItems.map((CartItem) => {
              return {
                productId: CartItem.productId,
                quantity: CartItem.quantity,
              };
            }),
          }
        : {},
    };
    if (status) data.status = status;

    const order = await prisma.order.create({ data });
    console.log(`Added order: ${order.id}`);
    //second query to get more detailed return
    const newOrder = await prisma.order.findUnique({
      where: { id: order.id },
      //where: category ? { categories: { some: { name: { equals: category } } } } : {},
      include: { CartItems: { include: { product: true } } },
    });
    //returning just "order" and longer order "newOrder"
    res.json({ order, newOrder });
  }

  if (req.method === "PUT") {
    const { id, status } = req.body;
    const data = {
      status,
    };
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data,
    });
    console.log(`Updated order: ${order.id}`);
    res.json(order);
  }
}
