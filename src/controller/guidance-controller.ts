import { NextFunction, Request, Response } from "express";
import { GuidanceService } from "../service/guidance-service";
import { GuidanceRequest } from "../model/guidance-model";

export class GuidanceController {
  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const request: GuidanceRequest = req.body;
      const result = await GuidanceService.store(request);
      
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
