import { NextFunction, Request, Response } from "express";
import { AccommodateRequest } from "../model/accommodate-model";
import { AccommodateService } from "../service/accommodate-service";

export class AccommodateController {
  static async getTutorTeacherByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId: number = parseInt(req.query.user_id as string);
      const result = await AccommodateService.getTutorTeacherByUserId(userId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getTutorTeacherByAccommodateId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const accommodateId: number = parseInt(req.params.accommodateId);
      const result = await AccommodateService.getTutorTeacherByAccommodateId(
        accommodateId
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeTutorTeacher(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request: AccommodateRequest = req.body;
      const result = await AccommodateService.storeTutorTeacher(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateTutorTeacherByAccommodateId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const accommodateId: number = parseInt(req.params.accommodateId);
      const request: AccommodateRequest = req.body
      const result = await AccommodateService.updateTutorTeacherByAccommodateId(request, accommodateId)
      
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
