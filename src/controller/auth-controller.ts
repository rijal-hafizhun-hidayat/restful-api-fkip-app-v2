import { Request, Response, NextFunction } from "express";
import { AuthService } from "../service/auth-service";
import {
  RequestUserPlp,
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

  static async getUserPlpByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token: string = req.get("Authorization")!;
      const result = await AuthService.getUserPlpByUserId(token);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeUserPlp(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.get("Authorization")!;
      const request: RequestUserPlp = req.body;
      const result = await AuthService.storeUserPlp(request, token);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyUserPlpById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userPlpId: number = parseInt(req.params.userPlpId);
      const result = await AuthService.destroyUserPlpById(userPlpId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserPlpById(req: Request, res: Response, next: NextFunction) {
    try {
      const userPlpId: number = parseInt(req.params.userPlpId);
      const result = await AuthService.getUserPlpById(userPlpId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUserPlpById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userPlpId: number = parseInt(req.params.userPlpId);
      const request: RequestUserPlp = req.body;
      const result = await AuthService.updateUserPlpById(userPlpId, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
