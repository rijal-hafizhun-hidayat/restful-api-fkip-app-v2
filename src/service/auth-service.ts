import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import { LoginRequest, LoginResponse, toLoginResponse } from "../model/auth-model";
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
        }, "swefijlzc22@#()33vsd", { expiresIn: 7200 })

        return toLoginResponse(user, token)
    }

    static async currentUser(request: string){
        const token = request.split(' ')
        const requestToken = Validation.validate(AuthValidation.TokenRequest, token[1])

        const userId = Jwt.verify(requestToken, 'swefijlzc22@#()33vsd') as JwtPayload

        const user = await prisma.user.findUnique({
            where: {
                id: userId.id
            }
        })

        if(!user){
            throw new ErrorResponse(404, 'user not found')
        }

        return user
    }

    static async refreshToken(token: string){
        const tokenSplit = token.split(' ')
        
        const verifToken = Jwt.verify(tokenSplit[1], 'swefijlzc22@#()33vsd') as JwtPayload

        if(!verifToken.data){
            const token = Jwt.sign({
                id: verifToken.data.id
            }, "swefijlzc22@#()33vsd", { expiresIn: 7200 })
        }
        else{
            const token = tokenSplit[1]
        }
    }
}