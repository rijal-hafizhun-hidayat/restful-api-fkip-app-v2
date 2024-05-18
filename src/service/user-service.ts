import { prisma } from "../app/database";
import { RegisterRequest, RegisterResponse, toRegisterResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"

export class UserService{
    static async register(request: RegisterRequest): Promise<RegisterResponse>{
        const registerRequest = Validation.validate(UserValidation.registerRequest, request)
        const user = await prisma.user.create({
            data: {
                name: registerRequest.name,
                username: registerRequest.username,
                role_id: registerRequest.role_id,
                email: registerRequest.email,
                password: bcrypt.hashSync(registerRequest.password, 10)
            }
        })

        return toRegisterResponse(user)
    }

    static async getAllData(page: number){
        const perPage: number = 5
        const offset: number = (page - 1) * perPage;

        const user = await prisma.user.findMany({
            take: perPage,
            skip: offset,
            select: {
                id: true,
                name: true,
                email: true,
                role: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        })
        
        return user
    }
}