import { plp } from "@prisma/client"

export type PlpRequest = {
    name: string,
    school_year_id: number
}

export type PlpResponse = {
    name: string,
    school_year_id: number,
    created_at: Date,
    updated_at: Date
}

export function toPlpResponse(plp: plp): PlpResponse{
    return {
        name: plp.name,
        school_year_id: plp.school_year_id!,
        created_at: plp.created_at,
        updated_at: plp.updated_at
    }
}