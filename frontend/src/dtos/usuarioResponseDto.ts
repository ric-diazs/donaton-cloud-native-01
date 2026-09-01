import type { RegistroUsuarioType } from "../schemas/usuarioSchema";

export interface UsuarioResponse extends RegistroUsuarioType {
    id: number;
    supabaseId: string;
    creadoEn: string;
};
