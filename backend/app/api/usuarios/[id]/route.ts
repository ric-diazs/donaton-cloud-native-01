import { UsuarioRepository } from "@/src/repository/usuarioRepository";
import { UsuarioService } from "@/src/service/usuarioService";
import { NextRequest, NextResponse } from "next/server";

const usuarioRepository = new UsuarioRepository(),
      usuarioService = new UsuarioService(usuarioRepository);

export const GET = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {

    const id = parseInt((await params).id);

    try {
        const usuario = await usuarioService.obtenerUsuarioPorId(id);

        return NextResponse.json(usuario, { status: 200 })
    } catch(error) {
        const errorMsg = error instanceof Error ? error.message : "Error al buscar al usuario";

        if(errorMsg.includes("no existe")) {
            return NextResponse.json({ error: errorMsg }, { status: 404 });
        }

        return NextResponse.json({ error: errorMsg }, { status: 400 });
    }
};

export const DELETE = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const id = parseInt((await params).id);

    try {
        await usuarioService.eliminarUsuario(id);

        return new NextResponse( null, { status: 204 } );
    } catch(error) {
        const errorMsg = error instanceof Error ? error.message : "Error al eliminar al usuario";

        if(errorMsg.includes("no existe")) {
            return NextResponse.json({ error: errorMsg }, { status: 404 });
        }

        return NextResponse.json({ error: errorMsg }, { status: 400 });
    };
};
