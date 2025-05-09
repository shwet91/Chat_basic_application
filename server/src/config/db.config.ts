import { PrismaClient } from "../../prisma/generated/prisma/client.js";

const prisma = new PrismaClient({
  log: ["error"],
});

export default prisma;
