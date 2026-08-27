import z from "zod";

export const LoginSchema = z.object({
   /*
       Se evaluan dos posibles errores para el email:
       - Que el campo este vacio (undefined o "").
       - Que sea invalido (que falte el '@').
   */
    email: z.email({
        // 'issue' es solo el nombre de la variable. Puede ser cualquier otra palabra
        error: (issue) => issue.input === undefined || issue.input === "" ? "Campo obligatorio" : "Correo inválido"
    }),

    // Se evalua que el campo 'password' no este vacio
    password: z.string().nonempty({error: "Campo obligatorio"})
});

// Se hace una inferencia del tipo del esquema de Zod
// y se almacena como 'type' para usarlo como tipo de dato
export type LoginType = z.infer<typeof LoginSchema>;
