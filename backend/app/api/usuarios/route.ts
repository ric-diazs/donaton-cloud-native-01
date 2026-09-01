import { UsuarioRepository } from "@/src/repository/usuarioRepository";
import { UsuarioService } from "@/src/service/usuarioService";
import { NextRequest, NextResponse } from "next/server";

const usuarioRepository = new UsuarioRepository(),
      usuarioService = new UsuarioService(usuarioRepository);

export const GET = async () => {
        const usuarios = await usuarioService.obtenerUsuarios();

        if(!usuarios || usuarios.length === 0) {
            return new NextResponse(null, { status: 204 });
        };

        return NextResponse.json(usuarios, { status: 200 });
};

export const POST = async(request: NextRequest) => {
    const body = await request.json();

    try {
        const nuevaUsuario = await usuarioService.crearUsuario(body);

        return NextResponse.json(nuevaUsuario, { status: 201 });
    } catch (error) {
        const mensajeError = error instanceof Error ? error.message : "Error al crear al usuario";

        return NextResponse.json({ error: mensajeError }, { status: 400 });
    }

};
