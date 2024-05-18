import { user } from "@prisma/client"

export type RegisterRequest = {
    name: string,
    username: string,
    role_id: number,
    email: string,
    password: string
}

export type UserResponse = {
    name: string,
    username: string,
    role_id: number,
    email: string
}

export type PasswordRequest = {
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

export function toUserResponse(user: user): UserResponse{
    return {
        name: user.name,
        username: user.username,
        role_id: user.role_id,
        email: user.email
    }
}