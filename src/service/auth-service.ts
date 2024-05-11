import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import { LoginRequest, LoginResponse, TokenRequest, toLoginResponse } from "../model/auth-model";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";
import Jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthService{
    static async login(request: LoginRequest): Promise<LoginResponse>{
        const loginRequest = Validation.validate(AuthValidation.LoginRequest, request)
        
        const user = await prisma.user.findFirst({
            where: {
                username: loginRequest.username
            }
        })

        if(!user){
            throw new ErrorResponse(404, 'username or password is wrong')
        }

        const isComparePasswordValid = await bcrypt.compare(loginRequest.password, user.password);

        if(!isComparePasswordValid){
            throw new ErrorResponse(404, 'username or password is wrong')
        }

        const token = Jwt.sign({
            id: user.id
        }, "swefijlzc22@#()33vsd", { expiresIn: 60 * 60 })

        const updateUserToken = await prisma.user.update({
            where: {
                username: loginRequest.username
            },
            data: {
                token: token
            }
        })

        return toLoginResponse(updateUserToken)
    }

    static async currentUser(request: string){
        const requestToken = Validation.validate(AuthValidation.TokenRequest, request)

        const userId = Jwt.verify(requestToken, 'swefijlzc22@#()33vsd') as JwtPayload

        const user = await prisma.user.findUnique({
            where: {
                id: userId.id
            }
        })

        if(!user){
            throw new ErrorResponse(404, 'user not found')
        }

        return toLoginResponse(user)
    }
}