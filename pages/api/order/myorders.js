import { getSession } from "next-auth/react";
import prisma from "lib/prisma";

// to login the action
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
  return result;
});

export default async function handle(req, res) {
  const session = await getSession({ req });

  console.log(session);

  if (req.method === "GET") {
    //console.log(session);
    console.log("received GET on api/order/myorders");
    if (session) {
      const orders = await prisma.order.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        include: {
          CartItems: { include: { product: true } },
          user: true,
        },
        where: {
          user: {
            email: {
              equals: session?.dbUser.email,
            },
          },
        },
      });
      res.status(200).json({ orders: orders });
    } else {
      console.log("NO PERMISSION");
      res.status(401).json({ orders: [], message: "NO PERMISSION" });
    }
  }
}
