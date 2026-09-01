import { createClient } from "../lib/supabase/server";
import { UsuarioRepository } from "../repository/usuarioRepository";
import { usuarioSchema } from "../schemas/usuarioSchema";

export class UsuarioService {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async obtenerUsuarios() {
        return await this.usuarioRepository.getUsuarios();
    };

    async obtenerUsuarioPorId(id: number) {
        const usuario =  await this.usuarioRepository.getUsuarioById(id);

        if(!usuario) {
            const error = new Error(`El usuario de id '${id}' no existe`);
            
            throw error;
        }

        return usuario;
    };

    async crearUsuario(payload: unknown) {
        const payloadParsed = usuarioSchema.safeParse(payload);

        if(!payloadParsed.success) {
            throw payloadParsed.error.issues?.[0]?.message;
        }

        const { nombre, correo, password, rol, nombreOrg } = payloadParsed.data;

        // Primero se guarda el usuario en la tabla 'auth.user' de Supabase
        // Aca se obtiene un 'user' de tipo 'User' de Auth, del cual se usara
        // su 'id' que sera el valor de 'supabaseId' de la tabla 'public.usuario'
        const supabase = await createClient();

        const { data: user, error } = await supabase.auth.admin.createUser({
            email: correo,
            password: password
        });

        if(error) {
            throw new Error(`Error en Supabase: ${error.message}`)
        }

        // Luego, se guarda el usuario en la tabla 'public.usuario' de Prisma
        // En este punto se guarda el 'id' de 'auth.user' en variable 'supabaseId'
        return await this.usuarioRepository.createUsuario({
            supabaseId: user.user.id,
            nombre: nombre,
            correo: correo,
            rol: rol,
            nombreOrg: nombreOrg
        });
    };

    async eliminarUsuario(id: number) {
        const usuario = await this.usuarioRepository.getUsuarioById(id);

        if(!usuario) {
            const errorUsuario = new Error(`El usuario de id '${id}' no existe`);
            
            throw errorUsuario;
        }

        // Primero se elimina al usuario en la tabla 'auth.user'
        const supabase = await createClient();

        const { error } = await supabase.auth.admin.deleteUser(usuario.supabaseId)

        if(error) {
            throw new Error(`Error al eliminar a usuario en Supabase: ${error.message}`)
        }

        await this.usuarioRepository.deleteUsuarioById(id);
    };
};
