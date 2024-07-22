import { role } from "@prisma/client"

export type RoleRequest = {
    name: string,
    guard: boolean
}

export type RoleResponse = {
    name: string,
    guard: boolean,
    created_at: Date,
    update_at: Date
}

export function toRoleResponse(role: role): RoleResponse{
    return {
        name: role.name,
        guard: role.guard!,
        created_at: role.created_at,
        update_at: role.updated_at
    }
}