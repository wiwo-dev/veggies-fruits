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
  const data = { note: `Chekup done on: ${new Date().toLocaleString("pl-PL")}` };
  const databaseCheck = await prisma.databaseCheck.create({ data });
  console.log(`Added checkup: ${databaseCheck.note}`);
  res.status(200).json(databaseCheck);
  //res.status(200).json({ name: 'John Doe' })
}
