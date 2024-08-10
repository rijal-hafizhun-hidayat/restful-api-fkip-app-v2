import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  ProdiRequest,
  ProdiResponse,
  toProdiResponse,
} from "../model/prodi-model";
import { ProdiValidation } from "../validation/prodi-validation";
import { Validation } from "../validation/validation";

export class ProdiService {
  static async getAll(): Promise<any> {
    const prodi = await prisma.prodi.findMany();

    return prodi;
  }

  static async store(request: ProdiRequest): Promise<ProdiResponse> {
    const requestBody: ProdiRequest = Validation.validate(
      ProdiValidation.ProdiRequest,
      request
    );

    const [prodi] = await prisma.$transaction([
      prisma.prodi.create({
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toProdiResponse(prodi);
  }

  static async findByProdiId(prodiId: number): Promise<ProdiResponse> {
    const prodi = await prisma.prodi.findUnique({
      where: {
        id: prodiId,
      },
    });

    if (prodi === null) {
      throw new ErrorResponse(404, "prodi not found");
    }

    return toProdiResponse(prodi);
  }

  static async updateByProdiId(
    request: ProdiRequest,
    prodiId: number
  ): Promise<ProdiResponse> {
    const requestBody: ProdiRequest = Validation.validate(
      ProdiValidation.ProdiRequest,
      request
    );

    const [prodi] = await prisma.$transaction([
      prisma.prodi.update({
        where: {
          id: prodiId,
        },
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toProdiResponse(prodi);
  }

  static async destroyByProdiId(prodiId: number): Promise<ProdiResponse> {
    const [prodi] = await prisma.$transaction([
      prisma.prodi.delete({
        where: {
          id: prodiId,
        },
      }),
    ]);

    return toProdiResponse(prodi);
  }
}
