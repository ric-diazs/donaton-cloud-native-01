import { DonacionRepository } from "@/src/repository/donacionRepository";
import { DonacionService } from "@/src/service/donacionService";
import { NextRequest, NextResponse } from "next/server";

const donacionRepository = new DonacionRepository(),
      donacionService = new DonacionService(donacionRepository);


export const GET = async () => {
        const donaciones = await donacionService.obtenerDonaciones();

        if(!donaciones || donaciones.length === 0) {
            return new NextResponse(null, { status: 204 });
        };

        return NextResponse.json(donaciones, { status: 200 });
};

export const POST = async(request: NextRequest) => {
    const body = await request.json();

    try {
        const nuevaDonacion = await donacionService.crearDonacion(body);

        return NextResponse.json(nuevaDonacion, { status: 201 });
    } catch (error) {
        const mensajeError = error instanceof Error ? error.message : "Error al crear la donación";

        return NextResponse.json({ error: mensajeError }, { status: 400 });
    }

};

