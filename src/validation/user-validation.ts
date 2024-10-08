import { ZodType, number, string, z } from "zod";

export class UserValidation {
  static readonly registerRequest: ZodType = z.object({
    name: string().min(1).max(100),
    username: string().min(1).max(100),
    role_id: number().min(1),
    prodi_id: number().optional(),
    email: string().min(1).max(100),
    password: string().min(1).max(100),
  });

  static readonly passwordRequest: ZodType = z.object({
    password: string().min(1).max(100),
  });

  static readonly updateRequest: ZodType = z.object({
    name: string().min(1).max(100),
    username: string().min(1).max(100),
    role_id: number().min(1),
    prodi_id: number().optional(),
    email: string().min(1).max(100),
  });
}
