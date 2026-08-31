import "dotenv/config";
import { PrismaClient } from "../../prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if(!connectionString) {
    throw new Error("La variable 'DATABASE_URL' no está definida");
}

const adapter = new PrismaPg({
    connectionString: connectionString,
});

// Para evitar el 'hot reloaded' de Next JS en modo Dev
// Fuente: https://www.prisma.io/docs/orm/v7/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient
const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient
}

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter: adapter });

export { prisma };

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
