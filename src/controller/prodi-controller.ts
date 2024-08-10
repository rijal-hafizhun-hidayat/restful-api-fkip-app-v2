import { NextFunction, Request, Response } from "express";
import { ProdiQueryParamsRequest, ProdiRequest } from "../model/prodi-model";
import { ProdiService } from "../service/prodi-service";

export class ProdiController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ProdiService.getAll();

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams: ProdiQueryParamsRequest = req.query;
      const result = await ProdiService.search(queryParams);
      
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const request: ProdiRequest = req.body;
      const result = await ProdiService.store(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByProdiId(req: Request, res: Response, next: NextFunction) {
    try {
      const prodiId: number = parseInt(req.params.prodiId);
      const result = await ProdiService.findByProdiId(prodiId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateByProdiId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const prodiId: number = parseInt(req.params.prodiId);
      const request: ProdiRequest = req.body;
      const result = await ProdiService.updateByProdiId(request, prodiId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyByProdiId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const prodiId: number = parseInt(req.params.prodiId);
      const result = await ProdiService.destroyByProdiId(prodiId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
