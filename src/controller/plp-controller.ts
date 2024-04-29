import {Request, Response, NextFunction } from "express";
import { PlpService } from "../service/plp-service";

export class PlpController{
    static async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const result = await PlpService.getAll()
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async store(req: Request, res: Response, next: NextFunction){
        try {
            const result = await PlpService.store(req.body)
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async findById(req: Request, res: Response, next: NextFunction){
        try {
            const plpId: number = parseInt(req.params.plpId)
            const result = await PlpService.findById(plpId)
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async destroyById(req: Request, res: Response, next: NextFunction){
        try {
            const plpId: number = parseInt(req.params.plpId)
            const result = await PlpService.destroyById(plpId)
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}