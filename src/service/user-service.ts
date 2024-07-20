import { prisma } from "../app/database";
import { PasswordRequest, RegisterRequest, RegisterResponse, toUserResponse, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt"
import { ErrorResponse } from "../error/error-response";

export class UserService{
    static async register(request: RegisterRequest){
        const registerRequest = Validation.validate(UserValidation.registerRequest, request)
        const [user] = await prisma.$transaction([
            prisma.user.create({
                data: {
                    name: registerRequest.name,
                    username: registerRequest.username,
                    email: registerRequest.email,
                    password: bcrypt.hashSync(registerRequest.password, 10)
                }
            })
        ])

        await prisma.$transaction([
            prisma.user_roles.create({
                data: {
                    user_id: user.id,
                    role_id: registerRequest.role_id
                }
            })
        ])

        return user
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

        const isUserExist = await this.findDataById(userId)

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
        const isUserExist = await this.findDataById(userId)

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
                email: userRequest.email
            }
        })

        return toUserResponse(user)
    }

    static async getAllData(page: number, search: string){
        const searchQuery: string = search
        const perPage: number = 5
        const offset: number = (page - 1) * perPage;

        const user = await prisma.user.findMany({
            take: perPage,
            skip: offset,
            select: {
                id: true,
                name: true,
                email: true
            },
            orderBy: {
                id: 'desc'
            },
            where: {
                OR: [
                    {
                        name: {
                            contains: searchQuery,
                        },
                    },
                    {
                        email: {
                            contains: searchQuery,
                        },
                    },
                ]
            }
        })
        
        return user
    }
}