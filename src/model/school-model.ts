import { school } from "@prisma/client"

export type SchoolRequest = {
    name: string,
    plp_id: number,
    created_at: Date,
    update_at: Date
}

export function toSchoolResponse(school: school): SchoolRequest{
    return {
        name: school.name,
        plp_id: school.plp_id,
        created_at: school.created_at,
        update_at: school.created_at
    }
}