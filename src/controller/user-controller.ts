import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";
import { UserResponse } from "../model/user-model";

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
            const search: string = req.query.search as string
            
            const result = await UserService.getAllData(page, search)
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateById(req: Request, res: Response, next: NextFunction){
        try {
            const request: UserResponse = req.body
            const userId: number = parseInt(req.params.userId as string)

            const result: UserResponse = await UserService.updateDataById(request, userId)

            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async findById(req: Request, res: Response, next: NextFunction){
        try {
            const userId: number = parseInt(req.params.userId as string)
            const result: UserResponse = await UserService.findDataById(userId)

            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async updatePasswordById(req: Request, res: Response, next: NextFunction){
        try {
            const userId: number = parseInt(req.params.userId as string)
            const result: UserResponse = await UserService.updateDataPasswordById(req.body, userId)

            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}