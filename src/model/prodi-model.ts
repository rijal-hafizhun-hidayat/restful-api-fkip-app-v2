import { prodi } from "@prisma/client";

export type ProdiRequest = {
  name: string;
};

export type ProdiQueryParamsRequest = {
  q?: string
}

export type ProdiResponse = {
  name: string;
  created_at: Date;
  updated_at: Date;
};

export function toProdiResponse(prodi: prodi): ProdiResponse {
  return {
    name: prodi.name,
    created_at: prodi.created_at,
    updated_at: prodi.updated_at,
  };
}
