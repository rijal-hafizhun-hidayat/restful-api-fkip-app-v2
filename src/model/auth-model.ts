import { user } from "@prisma/client"

export type LoginRequest = {
    username: string,
    password: string
}

export type TokenRequest = {
    token: string
}

export type LoginResponse = {
    token?: string | null
}

export function toLoginResponse(user: user): LoginResponse{
    return {
        token: user.token
    }
}