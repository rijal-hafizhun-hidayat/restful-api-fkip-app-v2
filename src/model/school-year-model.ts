import { school_year } from "@prisma/client"

export type SchoolYearRequest = {
    name: string
}

export type SchoolYearResponse = {
    name: string,
    created_at: Date,
    updated_at: Date
}

export function toSchoolYearResponse(school_year: school_year): SchoolYearResponse {
    return{
        name: school_year.name,
        created_at: school_year.created_at,
        updated_at: school_year.updated_at
    }
}