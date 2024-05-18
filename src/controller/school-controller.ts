import { Request, Response, NextFunction } from "express";
import { SchoolRequest } from "../model/school-model";
import { SchoolService } from "../service/school-service";

export class SchoolController{
    static async store(req: Request, res: Response, next: NextFunction){
        try {
            const schoolRequest: SchoolRequest = req.body
            const result = await SchoolService.storeData(schoolRequest) 
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)            
        }
    }

    static async findById(req: Request, res: Response, next: NextFunction){
        try {
            const schoolId: number = parseInt(req.params.schoolId)
            const result = await SchoolService.findDataById(schoolId)

            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateById(req: Request, res: Response, next: NextFunction){
        try {
            const schoolId: number = parseInt(req.params.schoolId)
            const schoolRequest: SchoolRequest = req.body
            const result = await SchoolService.updateDataById(schoolRequest, schoolId)

            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async destroyById(req: Request, res: Response, next: NextFunction){
        try {
            const schoolId: number = parseInt(req.params.schoolId)
            const result = await SchoolService.deleteDataById(schoolId)
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}