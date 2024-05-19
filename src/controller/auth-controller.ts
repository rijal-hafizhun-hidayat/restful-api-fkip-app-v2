import { Request, Response, NextFunction } from "express";
import { AuthService } from "../service/auth-service";

export class AuthController{
    static async login(req: Request, res: Response, next: NextFunction){
        try {
            const login = await AuthService.login(req.body)
            // res.cookie('jwt', login.token, {
            //     expires: new Date(Date.now() + 8 * 3600000),
            //     secure: false, // set to true if you're using https
            //     httpOnly: true,
            // })
            return res.status(200).json({
                data: login
            })
        } catch (error) {
            next(error)
        }
    }

    static async currentUser(req: Request, res: Response, next: NextFunction){
        try {
            const token: string = req.header('Authorization') as string
            const user = await AuthService.currentUser(token)
            return res.status(200).json({
                data: user
            })
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction){
        try {
            const token: string = req.get('Authorization')!

            if(!token){
                return res.status(401).json({
                    data: 'unauthorized'
                }).end()
            }

            const result = await AuthService.logoutUser(token)

            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}