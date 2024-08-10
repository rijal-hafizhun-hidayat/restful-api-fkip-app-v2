import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";
import {
  RegisterRequest,
  SearchUsers,
  UpdateRequest,
  UserResponse,
} from "../model/user-model";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterRequest = req.body;
      const result = await UserService.register(request);
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page: number = parseInt(req.query.page as string);

      const result = await UserService.getAllData(page);
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams: SearchUsers = req.query;
      const result = await UserService.search(queryParams);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllByRoleId(req: Request, res: Response, next: NextFunction) {
    try {
      const roleId: number = parseInt(req.params.roleId as string);
      const result = await UserService.getAllByRoleId(roleId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateRequest = req.body;
      const userId: number = parseInt(req.params.userId as string);

      const result: UserResponse = await UserService.updateDataById(
        request,
        userId
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = parseInt(req.params.userId as string);
      const result: UserResponse = await UserService.findDataById(userId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePasswordById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId: number = parseInt(req.params.userId as string);
      const result: UserResponse = await UserService.updateDataPasswordById(
        req.body,
        userId
      );

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: number = parseInt(req.params.userId as string);
      const result = await UserService.destroyById(userId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
