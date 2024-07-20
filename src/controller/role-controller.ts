import {Request, Response, NextFunction } from "express";
import { RoleService } from "../service/role-service";

export class RoleController{
    static async store(req: Request, res: Response, next: NextFunction){
        try {
            const result = await RoleService.store(req.body);
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const search: string = req.query.search as string
            const result = await RoleService.getAll(search)
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllNotAdmin(req: Request, res: Response, next: NextFunction){
        try {
            const result = await RoleService.getAllNotAdmin()

            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async destroyById(req: Request, res: Response, next: NextFunction){
        try {
            const roleId: number = parseInt(req.params.roleId)
            const result = await RoleService.destroyById(roleId)
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async findById(req: Request, res: Response, next: NextFunction){
        try {
            const roleId: number = parseInt(req.params.roleId)
            const result = await RoleService.findById(roleId)
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateById(req: Request, res: Response, next: NextFunction){
        try {
            const roleId: number = parseInt(req.params.roleId)
            const result = await RoleService.updateById(req.body, roleId)
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}