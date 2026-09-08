import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "../../../../src/schemas/loginSchema";
import { autenticarUsuario } from "../../../../src/service/authService";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const resultado = LoginSchema.safeParse(body);

  if (!resultado.success) {
    return NextResponse.json(
      { mensaje: "Datos inválidos", errores: resultado.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const { usuario, token } = await autenticarUsuario(resultado.data);

    const response = NextResponse.json(usuario);
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ mensaje: "Credenciales inválidas" }, { status: 401 });
  }
}