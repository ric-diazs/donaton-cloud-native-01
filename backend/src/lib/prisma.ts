import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../../prisma/generated/prisma/client";

const adapter = new PrismaMariaDb({
    // Codigo tomado desde https://www.prisma.io/docs/prisma-orm/quickstart/mysql#7-instantiate-prisma-client
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter: adapter });

export { prisma };
