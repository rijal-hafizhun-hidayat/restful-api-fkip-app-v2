import { ZodType, string, z } from "zod";

export class AuthValidation{
    static readonly LoginRequest: ZodType = z.object({
        username: string().min(1).max(100),
        password: string().min(1).max(100)
    })

    static readonly TokenRequest: ZodType = z.string().min(1)
}