import z from "zod";

export const necesidadSchema = z.object({
    tipoNecesidad: z.string().nonempty({error: "Campo obligatorio"}),
    descripcion: z.string().nonempty({error: "Campo obligatorio"}),
    prioridad: z.string().nonempty({error: "Campo obligatorio"}),
    comunidadAfectada: z.string().nonempty({ error: "Campo obligatorio"})
});

export type NecesidadType = z.infer<typeof necesidadSchema>;
