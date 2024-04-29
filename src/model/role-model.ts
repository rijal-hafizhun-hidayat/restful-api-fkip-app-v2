import { role } from "@prisma/client"

export type RoleRequest = {
    name: string
}

export type RoleResponse = {
    name: string,
    created_at: Date,
    update_at: Date
}

export function toRoleResponse(role: role): RoleResponse{
    return {
        name: role.name,
        created_at: role.created_at,
        update_at: role.updated_at
    }
}