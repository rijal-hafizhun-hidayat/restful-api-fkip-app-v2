import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  GuidanceRequest,
  GuidanceResponse,
  toGuidanceResponse,
} from "../model/guidance-model";
import { GuidanceValidation } from "../validation/guidance-validation";
import { Validation } from "../validation/validation";

export class GuidanceService {
  static async getByUserId(userId: number): Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        roles: {
          include: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (user?.roles[0].role.name === null) {
      throw new ErrorResponse(404, "role user not defined");
    }

    if (user?.roles[0].role.name === "mahasiswa") {
      const guidances = await prisma.user_guidance.findMany({
        where: {
          user_id_colleger: userId,
        },
        include: {
          guidance: true,
        },
      });

      return guidances;
    } else if (user?.roles[0].role.name === "dpl") {
      const guidances = await prisma.user_guidance.findMany({
        where: {
          user_id_dpl: userId,
        },
        include: {
          guidance: true,
        },
      });

      return guidances;
    } else {
      throw new ErrorResponse(404, "user guidance not found");
    }
  }

  static async store(request: GuidanceRequest): Promise<GuidanceResponse> {
    const requestBody: GuidanceRequest = Validation.validate(
      GuidanceValidation.GuidanceRequest,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        id: requestBody.user_id,
      },
      select: {
        id: true,
        user_colleger: {
          select: {
            user_id_dpl: true,
          },
        },
        _count: {
          select: {
            user_colleger: {
              where: {
                user_id_dpl: {
                  not: null,
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "user not found");
    }

    if (
      user._count.user_colleger === 0 &&
      user.user_colleger[0].user_id_dpl === null
    ) {
      throw new ErrorResponse(
        404,
        "anda belum terhubung dengan dosen pembimbing anda"
      );
    }

    const [guidance] = await prisma.$transaction([
      prisma.guidance.create({
        data: {
          guidance_statement: requestBody.guidance_statement,
          guidance_stage: requestBody.guidance_stage,
          link: requestBody.link,
        },
      }),
    ]);

    await prisma.$transaction([
      prisma.user_guidance.create({
        data: {
          user_id_colleger: requestBody.user_id,
          user_id_dpl: user.user_colleger[0].user_id_dpl!,
          guidance_id: guidance.id,
        },
      }),
    ]);

    return toGuidanceResponse(guidance);
  }

  static async destroyByGuidanceId(
    guidanceId: number
  ): Promise<GuidanceResponse> {
    const [guidance] = await prisma.$transaction([
      prisma.guidance.delete({
        where: {
          id: guidanceId,
        },
      }),
    ]);

    return toGuidanceResponse(guidance);
  }

  static async findByGuidanceId(guidanceId: number): Promise<GuidanceResponse> {
    const guidance = await prisma.guidance.findUnique({
      where: {
        id: guidanceId,
      },
    });

    if (!guidance) {
      throw new ErrorResponse(404, "guidance not found");
    }

    return toGuidanceResponse(guidance);
  }

  static async updateByGuidanceId(
    guidanceId: number,
    request: GuidanceRequest
  ): Promise<GuidanceResponse> {
    const requestBody: GuidanceRequest = Validation.validate(
      GuidanceValidation.GuidanceRequest,
      request
    );

    const [guidance] = await prisma.$transaction([
      prisma.guidance.update({
        where: {
          id: guidanceId,
        },
        data: {
          guidance_statement: requestBody.guidance_statement,
          guidance_stage: requestBody.guidance_stage,
          guidance_note: requestBody.guidance_note,
          link: requestBody.link,
        },
      }),
    ]);

    return toGuidanceResponse(guidance);
  }
}
