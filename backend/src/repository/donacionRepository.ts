import { DonacionCreateInput, DonacionUpsertArgs } from "@/prisma/generated/prisma/models";
import { prisma } from "../lib/prisma";

export class DonacionRepository {
    async getDonaciones() {
        return await prisma.donacion.findMany({ orderBy: { creadoEn: "desc" } });
    };

    async getDonacionById(id: number) {
        return await prisma.donacion.findUnique({ where: { id: id }});
    };

    async createDonacion(data: DonacionCreateInput) {
        return await prisma.donacion.create({ data: data });
    };

    async upsertDonacion(args: DonacionUpsertArgs) {
        return await prisma.donacion.upsert(args);
    };

    async deleteDonacionById(id: number) {
        return await prisma.donacion.delete({ where: { id: id }});
    };
};
