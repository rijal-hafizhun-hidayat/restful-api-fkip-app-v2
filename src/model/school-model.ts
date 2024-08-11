import { school } from "@prisma/client";

export type SchoolRequest = {
  name: string;
  plp_id: number;
  created_at: Date;
  update_at: Date;
};

export type SchoolResponse = {
  name: string;
  created_at: Date;
  update_at: Date;
};

export type SchoolQueryParams = {
  q?: string
}

export function toSchoolResponse(school: school): SchoolResponse {
  return {
    name: school.name,
    created_at: school.created_at,
    update_at: school.created_at,
  };
}
