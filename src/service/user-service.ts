import { prisma } from "../app/database";
import { PasswordRequest, RegisterRequest, RegisterResponse, toRegisterResponse, toUserResponse, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"
import { ErrorResponse } from "../error/error-response";

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

    static async findDataById(userId: number): Promise<UserResponse>{
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user){
            throw new ErrorResponse(404, 'user not found')
        }

        return toUserResponse(user)
    }

    static async updateDataPasswordById(request: PasswordRequest, userId: number): Promise<UserResponse>{
        const passwordRequest = Validation.validate(UserValidation.passwordRequest, request)

        const isUserExist = this.findDataById(userId)

        if(!isUserExist){
            throw new ErrorResponse(404, 'user not found')
        }

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: bcrypt.hashSync(passwordRequest.password, 10)
            }
        })

        return toUserResponse(user)
    }

    static async updateDataById(request: UserResponse, userId: number): Promise<UserResponse>{
        const userRequest = Validation.validate(UserValidation.updateRequest, request)
        const isUserExist = this.findDataById(userId)

        if(!isUserExist){
            throw new ErrorResponse(404, 'user not found')
        }

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name: userRequest.name,
                username: userRequest.username,
                role_id: userRequest.role_id,
                email: userRequest.email
            }
        })

        return toUserResponse(user)
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