import { user } from "@prisma/client"

export type RegisterRequest = {
    name: string,
    username: string,
    role_id: number,
    email: string,
    password: string
}

export type RegisterResponse = {
    token: string
}

export function toRegisterResponse(user: user): RegisterResponse{
    return {
        token: user.token!
    }
}