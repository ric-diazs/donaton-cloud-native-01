import { UsuarioCreateInput, UsuarioUpsertArgs } from "@/prisma/generated/prisma/models";
import { prisma } from "../lib/prisma";

export class UsuarioRepository {
    async getUsuarios() {
        return await prisma.usuario.findMany();
    };

    async getUsuarioById(id: number) {
        return await prisma.usuario.findUnique( { where: { id: id } } );
    };

    async getUsuarioByCorreo(correo: string) {
        return await prisma.usuario.findUnique( { where: { correo: correo } } );
    };

    async createUsuario(data: UsuarioCreateInput) {
        return await prisma.usuario.create( { data: data } );
    };

    async upsertUsuario(args: UsuarioUpsertArgs) {
        return await prisma.usuario.upsert(args);
    };

    async deleteUsuarioById(id: number) {
        return await prisma.usuario.delete({ where: { id: id } });
    };
};

