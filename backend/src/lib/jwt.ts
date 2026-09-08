import jwt from "jsonwebtoken";
import { Rol } from "@/prisma/generated/prisma/enums";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("Falta definir JWT_SECRET en las variables de entorno");
}

export interface PayloadUsuario {
  id: number;
  nombre: string;
  rol: Rol;
}

export function generarToken(payload: PayloadUsuario): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "8h" });
}

export function verificarToken(token: string): PayloadUsuario {
  return jwt.verify(token, JWT_SECRET) as PayloadUsuario;
}