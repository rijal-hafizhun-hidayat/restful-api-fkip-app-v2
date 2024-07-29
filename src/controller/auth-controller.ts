import { Request, Response, NextFunction, response } from "express";
import { AuthService } from "../service/auth-service";
import {
  UpdatePasswordRequest,
  UpdateProfileRequest,
} from "../model/auth-model";

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const login = await AuthService.login(req.body);
      return res.status(200).json({
        data: login,
      });
    } catch (error) {
      next(error);
    }
  }

  static async currentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.header("Authorization") as string;
      const user = await AuthService.currentUser(token);
      return res.status(200).json({
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.header("Authorization") as string;
      const request: UpdateProfileRequest = req.body;
      const result = await AuthService.updateProfile(request, token);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.header("Authorization") as string;
      const request: UpdatePasswordRequest = req.body;
      const result = await AuthService.updatePassword(request, token);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.get("Authorization")!;
      const result = await AuthService.refreshToken(token);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
