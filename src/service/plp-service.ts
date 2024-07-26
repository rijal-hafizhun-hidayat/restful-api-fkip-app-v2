import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import { PlpRequest, PlpResponse, toPlpResponse } from "../model/plp-model";
import { PlpValidation } from "../validation/plp-validation";
import { Validation } from "../validation/validation";

export class PlpService {
  static async getAll() {
    return await prisma.plp.findMany({
      include: {
        school_years: {
          include: {
            school_year: true,
          },
        },
      },
    });
  }

  static async store(request: PlpRequest): Promise<PlpResponse> {
    const plpRequest = Validation.validate(PlpValidation.PlpRequest, request);

    const [plp] = await prisma.$transaction([
      prisma.plp.create({
        data: {
          name: plpRequest.name,
        },
      }),
    ]);

    await prisma.$transaction([
      prisma.plp_school_year.create({
        data: {
          plp_id: plp.id,
          school_year_id: plpRequest.school_year_id,
        },
      }),
    ]);

    return toPlpResponse(plp);
  }

  static async findById(plpId: number): Promise<any> {
    const plp = await prisma.plp.findUnique({
      where: {
        id: plpId,
      },
      include: {
        school_years: {
          include: {
            school_year: true,
          },
        },
      },
    });

    if (plp === null) {
      throw new ErrorResponse(404, "Plp not found");
    }

    return plp;
  }

  static async destroyById(plpId: number): Promise<PlpResponse> {
    const isPlpExists = await this.findById(plpId);

    if (isPlpExists === null) {
      throw new ErrorResponse(404, "Plp not found");
    }

    const [plp] = await prisma.$transaction([
      prisma.plp.delete({
        where: {
          id: plpId,
        },
      }),
    ]);

    return toPlpResponse(plp);
  }

  static async updateDataById(
    request: PlpRequest,
    plpId: number
  ): Promise<PlpResponse> {
    const plpRequest: PlpRequest = Validation.validate(
      PlpValidation.PlpRequest,
      request
    );

    const isPlpExists = await this.findById(plpId);

    if (!isPlpExists) {
      throw new ErrorResponse(404, "plp not found");
    }

    const [plp] = await prisma.$transaction([
      prisma.plp.update({
        where: {
          id: plpId,
        },
        data: {
          name: plpRequest.name,
        },
      }),
    ]);

    await prisma.$transaction([
      prisma.plp_school_year.deleteMany({
        where: {
          plp_id: plp.id,
        },
      }),

      prisma.plp_school_year.create({
        data: {
          plp_id: plp.id,
          school_year_id: plpRequest.school_year_id,
        },
      }),
    ]);

    return toPlpResponse(plp);
  }
}
