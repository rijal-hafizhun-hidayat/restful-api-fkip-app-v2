import { user } from "@prisma/client"

export type LoginRequest = {
    username: string,
    password: string
}

export type LoginResponse = {
    plp_id?: number | null,
    role_id: number,
    name: string,
    token?: string | null
}

export function toLoginResponse(user: user): LoginResponse{
    return {
        plp_id: user.plp_id,
        role_id: user.role_id,
        name: user.name,
        token: user.token
    }
}