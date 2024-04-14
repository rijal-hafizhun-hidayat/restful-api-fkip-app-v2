import { prisma } from "../app/database";
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
}