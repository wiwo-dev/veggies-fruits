import { getSession } from "next-auth/react";
import prisma from "lib/prisma";

export default async function handle(req, res) {
  const session = await getSession({ req });
  let currentUser;

  if (!session) {
    res.send({
      error: "You must be sign in to view the protected content on this page (current user data).",
    });
  }

  if (session.token.email) {
    currentUser = await prisma.user.findUnique({
      where: { email: session.token.email },
      //include: { categories: { select: { name: true, id: true } } },
    });
  }

  if (req.method === "GET") {
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.send({
        error: "This user doesn't exists in the database",
      });
    }
  }

  const { name, image, address, address2, city, country, postcode, phoneNumber } = req.body;
  let newUserData = Object.assign(
    {},
    name && { name },
    { email: session.token.email },
    image && { image },
    address && { address },
    address2 && { address2 },
    city && { city },
    country && { country },
    postcode && { postcode },
    phoneNumber && { phoneNumber }
  );

  if (req.method === "POST") {
    if (currentUser) {
      res.send({
        error: "This user already exists in the database, use PUT method instead",
      });
    } else {
      const newUser = await prisma.user.create({
        data: { ...newUserData, email: session.token.email },
      });
      res.send(currentUser);
    }
  }

  if (req.method === "PUT") {
    if (currentUser) {
      //prisma edit
      const updatedUser = await prisma.user.update({
        where: {
          email: session.token.email,
        },
        data: newUserData,
      });
      res.send(currentUser);
    } else {
      res.send({
        error: "This user does not exist in the database. To create a new user use POST method instead",
      });
    }
  }
}
