import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
    globalForPrisma.prisma = prisma;
}

export default prisma;