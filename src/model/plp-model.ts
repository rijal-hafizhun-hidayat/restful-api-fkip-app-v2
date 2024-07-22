import { plp } from "@prisma/client"

export type PlpRequest = {
    name: string,
    school_year_id: number
}

export type PlpResponse = {
    name: string,
    created_at: Date,
    updated_at: Date
}

export function toPlpResponse(plp: plp): PlpResponse{
    return {
        name: plp.name,
        created_at: plp.created_at,
        updated_at: plp.updated_at
    }
}