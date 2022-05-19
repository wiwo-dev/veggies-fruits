import { getSession } from "next-auth/react";
import prisma from "lib/prisma";

export default async function handle(req, res) {
  const session = await getSession({ req });
  //console.log(session.user.email);
  if (req.method === "GET") {
    if (session.user.email) {
      const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        //include: { categories: { select: { name: true, id: true } } },
      });
      res.json(currentUser);
    } else {
      res.send({
        error: "Method not allowed",
      });
    }
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page (current user data).",
    });
  }
}
