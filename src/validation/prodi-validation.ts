import { string, z, ZodType } from "zod";

export class ProdiValidation {
  static readonly ProdiRequest: ZodType = z.object({
    name: string().min(1).max(100),
  });
}
