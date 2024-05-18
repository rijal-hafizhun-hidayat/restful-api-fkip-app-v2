import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";

export class UserController{
    static async register(req: Request, res: Response, next: NextFunction){
        try {
            const result = await UserService.register(req.body)
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const page: number = parseInt(req.query.page as string)
            const result = await UserService.getAllData(page)
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}