import type { NecesidadType } from "../schemas/necesidadSchema";

export interface NecesidadResponse extends NecesidadType {
    id: number;
    creadoEn: string;
};
