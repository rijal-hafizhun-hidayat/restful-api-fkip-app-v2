import { Request, Response, NextFunction } from "express";
import { SchoolYearRequest } from "../model/school-year-model";
import { SchoolYearService } from "../service/school-year-service";

export class SchoolYearController{
    static async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const search: string = req.query.search as string
            const result = await SchoolYearService.getAllData(search)

            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async findById(req: Request, res: Response, next: NextFunction){
        try {
            const schoolYearId: number = parseInt(req.params.schoolYearId)
            const result = await SchoolYearService.findDataById(schoolYearId)

            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateById(req: Request, res: Response, next: NextFunction){
        try {
            const schoolYearId: number = parseInt(req.params.schoolYearId)
            const request: SchoolYearRequest = req.body
            const result = await SchoolYearService.updateDataById(request, schoolYearId)

            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
    
    static async deleteById(req: Request, res: Response, next: NextFunction){
        try {
            const schoolYearId: number = parseInt(req.params.schoolYearId)
            const result = await SchoolYearService.deleteDataById(schoolYearId)
            
            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async store(req: Request, res: Response, next: NextFunction){
        try {
            const request: SchoolYearRequest = req.body
            const result = await SchoolYearService.storeData(request)

            return res.status(200).json({
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}