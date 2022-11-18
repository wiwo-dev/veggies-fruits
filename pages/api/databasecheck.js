import prisma from "lib/prisma";

// to login the action
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
  return result;
});

export default async function handler(req, res) {
  const data = { note: `Chekup done on: ${new Date().toLocaleString("pl-PL")}`, source: req.body.source };
  console.log("data", data);

  try {
    const databaseCheck = await prisma.databaseCheck.create({ data });
    console.log(`Added checkup: ${JSON.stringify(databaseCheck, null, 2)}`);
    res.status(200).json(databaseCheck);
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
  //res.status(200).json({ name: 'John Doe' })
}
