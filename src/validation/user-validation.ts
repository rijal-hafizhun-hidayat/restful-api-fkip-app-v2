import { ZodType, number, string, z } from "zod";

export class UserValidation{
    static readonly registerRequest: ZodType = z.object({
        name: string().min(1).max(100),
        username: string().min(1).max(100),
        role_id: number().min(1),
        email: string().min(1).max(100),
        password: string().min(1).max(100)
    })
}