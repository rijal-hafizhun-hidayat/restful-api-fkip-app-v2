import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import { CreateRoleRequest } from "../model/role-model";
import { RoleValidation } from "../validation/role-validation";
import { Validation } from "../validation/validation";

export class RoleService{
    static async store(request: CreateRoleRequest){
        const roleRequest = Validation.validate(RoleValidation.RoleRequest, request)

        return await prisma.role.create({
            data: {
                name: roleRequest.name
            }
        })
    }

    static async getAll(){
        return await prisma.role.findMany()
    }

    static async destroyById(roleId: number){
        const isRoleExists = await prisma.role.findUnique({
            where: {
                id: roleId
            },
        })

        if(isRoleExists === null){
            throw new ErrorResponse(404, 'role not found')
        }
        else{
            return await prisma.role.delete({
                where: {
                    id: roleId
                }
            })
        }
    }

    static async findById(roleId: number){
        const role = await prisma.role.findUnique({
            where: {
                id: roleId
            },
        })

        if(role !== null){
            return role
        }
        else{
            throw new ErrorResponse(404, 'role not found')
        }
    }
}