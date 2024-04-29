import { ZodType, string, z } from "zod";

export class PlpValidation {
    static readonly PlpRequest: ZodType = z.object({
        name: string().min(1).max(100)
    })
}