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
}