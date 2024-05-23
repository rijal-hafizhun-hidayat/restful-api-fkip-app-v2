import { ZodType, number, string, z } from "zod";

export class PlpValidation {
    static readonly PlpRequest: ZodType = z.object({
        name: string().min(1).max(100),
        school_year_id: number().min(1).int()
    })
}