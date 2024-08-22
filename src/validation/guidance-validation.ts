import { number, string, z, ZodType } from "zod";

export class GuidanceValidation {
  static readonly GuidanceRequest: ZodType = z.object({
    user_id: number().min(1),
    guidance_statement: string().min(1).max(255),
    guidance_stage: string().min(1).max(255),
    guidance_note: string().optional(),
    link: string().refine((value) => /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value), {
      message: 'Please enter a valid URL',
    }),
  });
}
