import { NecesidadRepository } from "../repository/necesidadRepository";
import { necesidadSchema } from "../schemas/necesidadSchema";

export class NecesidadService {
    constructor(private readonly necesidadRepository: NecesidadRepository) {};

    async obtenerNecesidades () {
        return await this.necesidadRepository.getNecesidades();
    };

    async obtenerNecesidadPorId(id: number) {
        const necesidad = this.necesidadRepository.getNecesidadById(id);

        if(!necesidad) {
            const error = new Error(`La necesidad de id '${id}' no existe`);
            
            throw error;
        }

        return necesidad;
    };

    async crearNecesidad(payload: unknown) {
        const payloadParsed = necesidadSchema.safeParse(payload);

        if(!payloadParsed.success) {
            throw payloadParsed.error.issues?.[0]?.message;
        }

        return await this.necesidadRepository.createNecesidad(payloadParsed.data);
    };

    async eliminarNecesidad(id: number) {
        const necesidad = this.necesidadRepository.getNecesidadById(id);

        if(!necesidad) {
            const error = new Error(`La necesidad de id '${id}' no existe`);
            
            throw error;
        }

        await this.necesidadRepository.deleteNecesidad(id);
    };
};
