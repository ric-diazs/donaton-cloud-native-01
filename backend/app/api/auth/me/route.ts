import { NextRequest, NextResponse } from "next/server";
import { verificarToken } from "../../../../src/lib/jwt";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ mensaje: "No autenticado" }, { status: 401 });
  }

  try {
    const usuario = verificarToken(token);
    return NextResponse.json(usuario);
  } catch {
    return NextResponse.json({ mensaje: "Token inválido o expirado" }, { status: 401 });
  }
}