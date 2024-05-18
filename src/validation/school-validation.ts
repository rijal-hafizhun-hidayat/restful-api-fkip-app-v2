import { number, string, z, ZodType } from "zod";

export class SchoolValidation{
    static readonly SchoolRequest: ZodType = z.object({
        name: string().min(1).max(100),
        plp_id: number().int()
    })
}