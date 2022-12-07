//this is used to prevent supabase from stopping - it's triggered by github action daily :)

import prisma from "lib/prisma";

export default async function handler(req, res) {
  const { body } = req;
  console.log(body);
  const data = { note: `Chekup done on: ${new Date().toLocaleString("pl-PL")}`, source: body.source };
  console.log("data", data);

  try {
    const databaseCheck = await prisma.databaseCheck.create({ data });
    console.log(`Added checkup: ${JSON.stringify(databaseCheck, null, 2)}`);
    res.status(200).json(databaseCheck);
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
}
