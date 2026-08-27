import { DonacionRepository } from "@/src/repository/donacionRepository";
import { DonacionService } from "@/src/service/donacionService";
import { NextRequest, NextResponse } from "next/server";

const donacionRepository = new DonacionRepository(),
      donacionService = new DonacionService(donacionRepository);


export const GET = async (
    request: NextRequest,
    // Dado que el 'id' viene de la URL, este siempre sera de tipo 'string'
    { params }: { params: Promise<{ id: string }> }
) => {
    const id = parseInt((await params).id);

    try {
        const donacion = await donacionService.obtenerDonacionPorId(id);

        return NextResponse.json( donacion, { status: 200 } );
    } catch(error) {
        const errorMsg = error instanceof Error ? error.message : "Error al buscar la donación";

        if(errorMsg.includes("no existe")) {
            return NextResponse.json({ error: errorMsg }, { status: 404 });
        }

        return NextResponse.json({ error: errorMsg }, { status: 400 });
    };
};

export const DELETE = async (
    request: NextRequest,
    // Dado que el 'id' viene de la URL, este siempre sera de tipo 'string'
    { params }: { params: Promise<{ id: string }> }
) => {
    const id = parseInt((await params).id);

    try {
        await donacionService.eliminarDonacion(id);

        return new NextResponse( null, { status: 204 } );
    } catch(error) {
        const errorMsg = error instanceof Error ? error.message : "Error al eliminar la donación";

        if(errorMsg.includes("no existe")) {
            return NextResponse.json({ error: errorMsg }, { status: 404 });
        }

        return NextResponse.json({ error: errorMsg }, { status: 400 });
    };
};
