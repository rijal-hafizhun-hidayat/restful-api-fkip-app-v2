import { Request, Response, NextFunction } from "express";
import { AuthService } from "../service/auth-service";

export class AuthController{
    static async login(req: Request, res: Response, next: NextFunction){
        try {
            const login = await AuthService.login(req.body)
            return res.status(200).json({
                data: login
            })
        } catch (error) {
            next(error)
        }
    }
}