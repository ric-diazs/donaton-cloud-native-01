import { createClient } from "../lib/supabase/server";
import { UsuarioRepository } from "../repository/usuarioRepository";
import { generarToken } from "../lib/jwt";
import type { LoginType } from "../schemas/loginSchema";

const usuarioRepository = new UsuarioRepository();

export async function autenticarUsuario({ email, password }: LoginType) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    throw new Error("Credenciales inválidas");
  }

  const usuario = await usuarioRepository.getUsuarioByCorreo(email);

  if (!usuario) {
    throw new Error("Usuario no encontrado en el sistema");
  }

  const token = generarToken({
    id: usuario.id,
    nombre: usuario.nombre,
    rol: usuario.rol,
  });

  return {
    usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol },
    token,
  };
}