// import { PrismaClient } from "@prisma/client";

import { PrismaClient } from "@/lib/generated/prisma/client";

// const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
