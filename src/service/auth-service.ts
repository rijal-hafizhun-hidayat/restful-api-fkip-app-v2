import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  LoginRequest,
  LoginResponse,
  toLoginResponse,
  toUpdateProfileRequest,
  UpdatePasswordRequest,
  UpdateProfileRequest,
} from "../model/auth-model";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";
import Jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { toUserResponse, UserResponse } from "../model/user-model";

export class AuthService {
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const loginRequest = Validation.validate(
      AuthValidation.LoginRequest,
      request
    );

    const user = await prisma.user.findFirst({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "username or password is wrong");
    }

    const isComparePasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    if (!isComparePasswordValid) {
      throw new ErrorResponse(404, "username or password is wrong");
    }

    const token = Jwt.sign(
      {
        id: user.id,
      },
      "swefijlzc22@#()33vsd",
      { expiresIn: 7200 }
    );

    return toLoginResponse(user, token);
  }

  static async currentUser(request: string): Promise<UserResponse> {
    const token = request.split(" ");
    const requestToken = Validation.validate(
      AuthValidation.TokenRequest,
      token[1]
    );

    const userId = Jwt.verify(
      requestToken,
      "swefijlzc22@#()33vsd"
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: userId.id,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    return toUserResponse(user);
  }

  static async updateProfile(
    request: UpdateProfileRequest,
    token: string
  ): Promise<UpdateProfileRequest> {
    const tokenUser = token.split(" ");
    const requestToken = Validation.validate(
      AuthValidation.TokenRequest,
      tokenUser[1]
    );
    const requestBody = Validation.validate(
      AuthValidation.UpdateRequest,
      request
    );

    const userId = Jwt.verify(
      requestToken,
      "swefijlzc22@#()33vsd"
    ) as JwtPayload;

    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId.id,
        },
        data: {
          name: requestBody.name,
          username: requestBody.username,
          email: requestBody.email,
        },
      }),
    ]);

    return toUpdateProfileRequest(user);
  }

  static async updatePassword(
    request: UpdatePasswordRequest,
    token: string
  ): Promise<UpdateProfileRequest> {
    const tokenUser = token.split(" ");
    const requestToken = Validation.validate(
      AuthValidation.TokenRequest,
      tokenUser[1]
    );
    const requestBody = Validation.validate(
      AuthValidation.UpdatePasswordRequest,
      request
    );

    const tokenDecoded = Jwt.verify(
      requestToken,
      "swefijlzc22@#()33vsd"
    ) as JwtPayload;

    const [user] = await prisma.$transaction([
        prisma.user.update({
            where: {
                id: tokenDecoded.id
            },
            data: {
                password: bcrypt.hashSync(requestBody.password, 10),
            }
        })
    ])

    return toUpdateProfileRequest(user);
  }

  static async refreshToken(token: string) {
    const tokenSplit = token.split(" ");

    const verifToken = Jwt.verify(
      tokenSplit[1],
      "swefijlzc22@#()33vsd"
    ) as JwtPayload;

    if (!verifToken.data) {
      const token = Jwt.sign(
        {
          id: verifToken.data.id,
        },
        "swefijlzc22@#()33vsd",
        { expiresIn: 7200 }
      );
    } else {
      const token = tokenSplit[1];
    }
  }
}
