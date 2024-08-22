import { guidance } from "@prisma/client";

export type GuidanceRequest = {
  user_id: number;
  guidance_statement: string;
  guidance_stage: string;
  guidance_note?: string;
  link: string;
};

export type GuidanceResponse = {
  id: number;
  guidance_statement: string;
  guidance_stage: string;
  guidance_note?: string;
  status?: string;
  link: string;
  created_at: Date;
  updated_at: Date;
};

export function toGuidanceResponse(guidance: guidance): GuidanceResponse {
  return {
    id: guidance.id,
    guidance_statement: guidance.guidance_statement,
    guidance_stage: guidance.guidance_stage,
    guidance_note: guidance.guidance_note ?? undefined,
    link: guidance.link,
    created_at: guidance.created_at,
    updated_at: guidance.updated_at,
    status: guidance.status ?? undefined
  };
}
