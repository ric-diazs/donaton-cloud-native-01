import z from "zod";

export const donacionSchema = z.object({
    tipo: z.string().nonempty({error: "Campo obligatorio"}),

    // Para parsear campos numericos, los cuales regresan por defecto un valor de tipo "string"
    // Se define que el metodo 'number' devuelve un valor de tipo 'number' porque, por defecto
    // retorna un valor 'unknown', el cual es invalido para el 'resolver'.
    cantidad: z.coerce.number<number>().gte(1, {error: "Cantidad inválida"}),
    peso: z.coerce.number<number>()
                .multipleOf(0.01, {error: "Debe ser un decimal con dos dígitos después de su punto"})
                .gte(0.01, {error: "Peso inválido"}),

    nombreDonante: z.string().optional(),

    correoDonante: z.email({error: "Correo inválido"})
});

// Se hace una inferencia del tipo del esquema de Zod
// y se almacena como 'type' para usarlo como tipo de dato
export type DonacionType = z.infer<typeof donacionSchema>;
