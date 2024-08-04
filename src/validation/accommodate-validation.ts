import { number, z, ZodType } from "zod";

export class AccommodateValidation {
  static readonly accommodateStoreValidation: ZodType = z.object({
    user_id: number().min(1).int(),
    user_id_accommodate: number().min(1).int(),
  });

  static readonly accommodateUpdateValidation: ZodType = z.object({
    user_id_accommodate: number().min(1).int(),
  });
}
