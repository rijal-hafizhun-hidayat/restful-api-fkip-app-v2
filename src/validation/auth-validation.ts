import { ZodType, string, z, number } from "zod";

export class AuthValidation {
  static readonly LoginRequest: ZodType = z.object({
    username: string().min(1).max(100),
    password: string().min(1).max(100),
  });

  static readonly TokenRequest: ZodType = z.string().min(1);

  static readonly UpdateRequest: ZodType = z.object({
    name: string().min(1).max(100),
    username: string().min(1).max(100),
    email: string().min(1).max(100),
  });

  static readonly UpdatePasswordRequest: ZodType = z.object({
    password: string().min(1).max(100),
  });

  static readonly RequestTypePlpValidation: ZodType = z.object({
    plp_id: number().min(1).int()
  });
}
