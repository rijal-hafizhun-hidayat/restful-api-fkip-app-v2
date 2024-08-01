import { string, z, ZodType } from "zod";

export class SchoolYearValidation {
  static readonly schoolYearRequest: ZodType = z.object({
    name: string().min(1).max(100),
  });
}
