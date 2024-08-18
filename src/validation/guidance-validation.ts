import { number, string, z, ZodType } from "zod";

export class GuidanceValidation {
  static readonly GuidanceRequest: ZodType = z.object({
    user_id: number().min(1),
    guidance_statement: string().min(1).max(255),
    guidance_stage: string().min(1).max(255),
    guidance_note: string().optional(),
    link: string().min(1).max(255),
  });
}
