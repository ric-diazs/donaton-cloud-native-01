import type { DonacionType } from "../schemas/donacionSchema";

export interface DonacionResponse extends DonacionType {
    id: number;
    creadoEn: string;
};
