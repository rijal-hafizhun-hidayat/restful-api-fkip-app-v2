import { NextFunction, Request, Response } from "express";
import { AccommodateTutorTeacherRequest } from "../model/accommodate-model";
import { AccommodateService } from "../service/accommodate-service";

export class AccommodateController {
  static async store(req: Request, res: Response, next: NextFunction) {
    try {
        const request: AccommodateTutorTeacherRequest = req.body
        const result = AccommodateService.store(request)

        return res.status(200).json({
            data: request
        })
    } catch (error) {
      next(error);
    }
  }
}
