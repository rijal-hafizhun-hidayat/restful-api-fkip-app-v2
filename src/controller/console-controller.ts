import { NextFunction, Request, Response } from "express";

export class ConsoleController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        data: "hello world",
      });
    } catch (error) {
      next(error);
    }
  }
}
