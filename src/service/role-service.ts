import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import { RoleRequest, RoleResponse, toRoleResponse } from "../model/role-model";
import { RoleValidation } from "../validation/role-validation";
import { Validation } from "../validation/validation";

export class RoleService{
    static async store(request: RoleRequest): Promise<RoleResponse>{
        const roleRequest = Validation.validate(RoleValidation.RoleRequest, request)

        const role = await prisma.role.create({
            data: {
                name: roleRequest.name
            }
        })

        return toRoleResponse(role)
    }

    static async getAll(search: string): Promise<any>{
        const searchQuery: string = search

        const roles = await prisma.role.findMany({
            where: {
                name: {
                    contains: searchQuery
                }
            }
        })

        return roles
    }

    static async getAllNotAdmin(): Promise<any>{
        const roles = await prisma.role.findMany({
            where: {
                guard: false
            }
        })

        return roles
    }

    static async destroyById(roleId: number): Promise<RoleResponse>{
        const isRoleExists = await prisma.role.findUnique({
            where: {
                id: roleId
            },
        })

        if(isRoleExists === null){
            throw new ErrorResponse(404, 'role not found')
        }

        const role = await prisma.role.delete({
            where: {
                id: roleId
            }
        })
        return toRoleResponse(role)
    }

    static async findById(roleId: number): Promise<RoleResponse>{
        const role = await prisma.role.findUnique({
            where: {
                id: roleId
            },
        })

        if(role === null){
            throw new ErrorResponse(404, 'role not found')
        }

        return toRoleResponse(role)
    }

    static async updateById(request: RoleRequest, roleId: number): Promise<RoleResponse>{
        const roleRequest = Validation.validate(RoleValidation.RoleRequest, request)
        const isRoleExist = await prisma.role.findUnique({
            where: {
                id: roleId
            }
        })

        if(isRoleExist === null){
            throw new ErrorResponse(404, 'role not found')
        }

        const role = await prisma.role.update({
            where: {
                id: roleId
            },
            data: {
                name: roleRequest.name
            }
        })

        return toRoleResponse(role)
    }
}