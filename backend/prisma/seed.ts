// Script para agregar un usuario inicial de prueba
// Mas info: https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
import { prisma } from "../src/lib/prisma";
import "dotenv/config";

async function main(): Promise<void> {
    const usuarioInicial = await prisma.usuario.upsert({
        where: { correo: "j.perez@donaton.com" },
        update: {},
        create: {
            nombre: "Juan Perez",
            correo: "j.perez@donaton.com",
            password: "admin123",
            rol: "ADMIN"
        }
    });

    console.log({ usuarioInicial })
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.log(error)
        await prisma.$disconnect();
        process.exit(1);
    });
