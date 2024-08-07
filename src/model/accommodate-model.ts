import { accommodates } from "@prisma/client";

export type AccommodateRequest = {
  user_id?: number,
  user_id_accommodate: number
};

export type AccommodateResponse = {
  user_id_dpl: number | null,
  user_id_tutor_teacher: number | null,
  user_id_colleger: number | null
}

export function toAccommodateResponse(accommodate: accommodates): AccommodateResponse{
  return {
    user_id_dpl: accommodate.user_id_dpl,
    user_id_tutor_teacher: accommodate.user_id_tutor_teacher,
    user_id_colleger: accommodate.user_id_colleger
  }
}