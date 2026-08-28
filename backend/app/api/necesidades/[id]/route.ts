import { NecesidadRepository } from "@/src/repository/necesidadRepository";
import { NecesidadService } from "@/src/service/necesidadService";
import { NextRequest, NextResponse } from "next/server";

const necesidadRepository = new NecesidadRepository(),
      necesidadService = new NecesidadService(necesidadRepository);

const GET = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {

    const id = parseInt((await params).id);

    try {
        const necesidad = await necesidadService.obtenerNecesidadPorId(id);

        return NextResponse.json(necesidad, { status: 200 })
    } catch(error) {
        const errorMsg = error instanceof Error ? error.message : "Error al buscar la necesidad";

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
        await necesidadService.eliminarNecesidad(id);

        return new NextResponse( null, { status: 204 } );
    } catch(error) {
        const errorMsg = error instanceof Error ? error.message : "Error al eliminar la necesidad";

        if(errorMsg.includes("no existe")) {
            return NextResponse.json({ error: errorMsg }, { status: 404 });
        }

        return NextResponse.json({ error: errorMsg }, { status: 400 });
    };
};
