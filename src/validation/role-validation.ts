import { ZodType, string, z } from "zod";

export class RoleValidation {
    static readonly RoleRequest: ZodType = z.object({
        name: string().min(1).max(100)
    })
}