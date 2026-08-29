import { NecesidadCreateInput, NecesidadUpsertArgs } from "@/prisma/generated/prisma/models";
import { prisma } from "../lib/prisma";

export class NecesidadRepository {
    async getNecesidades() {
        return await prisma.necesidad.findMany( { orderBy: { creadoEn: "desc" } } );
    };

    async getNecesidadById(id: number) {
        return await prisma.necesidad.findUnique({ where: { id: id } });
    };

    async createNecesidad(necesidad: NecesidadCreateInput) {
        return await prisma.necesidad.create({ data: necesidad });
    };

    async upsertNecesidad(args: NecesidadUpsertArgs) {
        return await prisma.necesidad.upsert(args);
    };

    async deleteNecesidad(id: number) {
        return await prisma.necesidad.delete( { where: { id: id } } );
    };
};
