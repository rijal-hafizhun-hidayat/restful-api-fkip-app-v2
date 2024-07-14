import { user } from "@prisma/client"

export type LoginRequest = {
    username: string,
    password: string
}

export type TokenRequest = {
    token: string
}

export type LoginResponse = {
    name: string,
    token?: string | null
}

export function toLoginResponse(user: user): LoginResponse{
    return {
        name: user.name,
        token: user.token
    }
}