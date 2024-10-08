import { prisma } from "../app/database";
import {
  PasswordRequest,
  RegisterRequest,
  SearchUsers,
  toUserResponse,
  UpdateRequest,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { ErrorResponse } from "../error/error-response";
import { LoginResponse, toLoginResponse } from "../model/auth-model";

export class UserService {
  static async register(request: RegisterRequest): Promise<LoginResponse> {
    const registerRequest = Validation.validate(
      UserValidation.registerRequest,
      request
    );

    const [user] = await prisma.$transaction([
      prisma.user.create({
        data: {
          name: registerRequest.name,
          username: registerRequest.username,
          email: registerRequest.email,
          password: bcrypt.hashSync(registerRequest.password, 10),
        },
      }),
    ]);

    await prisma.$transaction([
      prisma.user_roles.create({
        data: {
          user_id: user.id,
          role_id: registerRequest.role_id,
        },
      }),
    ]);

    if (registerRequest.prodi_id !== undefined) {
      await prisma.$transaction([
        prisma.user_prodis.create({
          data: {
            user_id: user.id,
            prodi_id: registerRequest.prodi_id,
          },
        }),
      ]);
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

  static async findDataById(userId: number): Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
        username: true,
        roles: {
          include: {
            role: true,
          },
        },
        prodis: {
          include: {
            prodi: true
          }
        }
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    return user;
  }

  static async updateDataPasswordById(
    request: PasswordRequest,
    userId: number
  ): Promise<UserResponse> {
    const passwordRequest = Validation.validate(
      UserValidation.passwordRequest,
      request
    );

    const isUserExist = await this.findDataById(userId);

    if (!isUserExist) {
      throw new ErrorResponse(404, "user not found");
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: bcrypt.hashSync(passwordRequest.password, 10),
      },
    });

    return toUserResponse(user);
  }

  static async updateDataById(
    request: UpdateRequest,
    userId: number
  ): Promise<any> {
    const userRequest = Validation.validate(
      UserValidation.updateRequest,
      request
    );
    
    const isUserExist = await this.findDataById(userId);

    if (!isUserExist) {
      throw new ErrorResponse(404, "user not found");
    }

    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: userRequest.name,
          username: userRequest.username,
          email: userRequest.email,
        },
      }),
    ]);

    await prisma.$transaction([
      prisma.user_roles.deleteMany({
        where: {
          user_id: user.id,
        },
      }),

      prisma.user_roles.create({
        data: {
          user_id: user.id,
          role_id: userRequest.role_id,
        },
      }),
    ]);

    if(userRequest.prodi_id !== undefined){
      await prisma.$transaction([
        prisma.user_prodis.deleteMany({
          where: {
            user_id: user.id
          }
        }),

        prisma.user_prodis.create({
          data: {
            user_id: user.id,
            prodi_id: userRequest.prodi_id
          }
        })
      ])
    }

    return toUserResponse(user);
  }

  static async getAllData(page: number): Promise<any> {
    const perPage: number = 5;
    const offset: number = (page - 1) * perPage;

    const user = await prisma.user.findMany({
      take: perPage,
      skip: offset,
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
        roles: {
          include: {
            role: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return user;
  }

  static async getAllByRoleId(roleId: number): Promise<any> {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        roles: {
          some: {
            role_id: roleId,
          },
        },
      },
    });

    return user;
  }

  static async destroyById(userId: number): Promise<UserResponse> {
    const [user] = await prisma.$transaction([
      prisma.user.delete({
        where: {
          id: userId,
        },
      }),
    ]);

    return toUserResponse(user);
  }

  static async search(queryParams: SearchUsers): Promise<any> {
    const page: number = queryParams.page ? parseInt(queryParams.page) : 1;
    const perPage: number = 5;
    const offset: number = (page - 1) * perPage;

    const query: any = [];

    if (queryParams.q) {
      query.push({
        OR: [
          {
            name: {
              contains: queryParams.q,
            },
          },
          {
            email: {
              contains: queryParams.q,
            },
          },
        ],
      });
    }

    const users = await prisma.user.findMany({
      where: {
        roles: {
          some: {
            role_id: queryParams.role_id
              ? parseInt(queryParams.role_id)
              : undefined,
          },
        },
        AND: query,
      },
      take: perPage,
      skip: offset,
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
        roles: {
          include: {
            role: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return users;
  }
}
