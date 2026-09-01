import { Rol } from "@/prisma/generated/prisma/enums";
import z from "zod";

/*
    Expresion regular que permite al menos:
    - 1 letra mayuscula
    - 1 letra minuscula
    - 1 caracter especial
    - 1 digito
    - Sin espacios en blanco (whitespaces)
*/
const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9\s])[\s\S]+$/;

export const usuarioSchema = z.object({
    nombre: z.string().nonempty({ error: "Campo obligatorio" }),
    password: z.string().regex(regexPassword, { error: "Password inválido" }),
    correo: z.email({
        error: (issue) => issue.input === undefined || issue.input === "" ? "Campo obligatorio" : "Correo inválido"
    }),
    rol: z.enum(Rol, { error: "Rol incorrecto." }),
    nombreOrg: z.string().optional()
});

export type RegistroUsuarioType = z.infer<typeof usuarioSchema>;
