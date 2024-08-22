import { NextFunction, Request, Response } from "express";
import { GuidanceService } from "../service/guidance-service";
import { GuidanceRequest } from "../model/guidance-model";

export class GuidanceController {
  static async getByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = parseInt(req.query.userId as string);
      const result = await GuidanceService.getByUserId(userId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
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
  static async findByGuidanceId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const guidanceId: number = parseInt(req.params.id);
      const result = await GuidanceService.findByGuidanceId(guidanceId);
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  static async destroyByGuidanceId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const guidanceId: number = parseInt(req.params.id);
      const result = await GuidanceService.destroyByGuidanceId(guidanceId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateByGuidanceId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const guidanceId: number = parseInt(req.params.id);
      const request: GuidanceRequest = req.body;
      const result = await GuidanceService.updateByGuidanceId(
        guidanceId,
        request
      );
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
