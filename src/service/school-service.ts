import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  SchoolQueryParams,
  SchoolRequest,
  SchoolResponse,
  toSchoolResponse,
} from "../model/school-model";
import { SchoolValidation } from "../validation/school-validation";
import { Validation } from "../validation/validation";

export class SchoolService {
  static async getAll(searchQuery: string): Promise<any> {
    const schools = await prisma.school.findMany({
      where: {
        name: {
          contains: searchQuery,
        },
      },
      include: {
        schools: {
          include: {
            plp: true,
          },
        },
      },
    });

    return schools;
  }

  static async storeData(request: SchoolRequest): Promise<SchoolResponse> {
    const schoolRequest = Validation.validate(
      SchoolValidation.SchoolRequest,
      request
    );

    const [school] = await prisma.$transaction([
      prisma.school.create({
        data: {
          name: schoolRequest.name,
        },
      }),
    ]);

    await prisma.$transaction([
      prisma.school_plps.create({
        data: {
          school_id: school.id,
          plp_id: schoolRequest.plp_id,
        },
      }),
    ]);

    return toSchoolResponse(school);
  }

  static async findDataById(schoolId: number): Promise<any> {
    const school = await prisma.school.findUnique({
      where: {
        id: schoolId,
      },
      include: {
        schools: {
          include: {
            plp: true,
          },
        },
      },
    });

    if (!school) {
      throw new ErrorResponse(404, "school not found");
    }

    return school;
  }

  static async deleteDataById(schoolId: number): Promise<SchoolResponse> {
    const isSchoolExist = await this.findDataById(schoolId);

    if (!isSchoolExist) {
      throw new ErrorResponse(404, "school not found");
    }

    const [school] = await prisma.$transaction([
      prisma.school.delete({
        where: {
          id: schoolId,
        },
      }),
    ]);

    return toSchoolResponse(school);
  }

  static async updateDataById(
    request: SchoolRequest,
    schoolId: number
  ): Promise<SchoolResponse> {
    const schoolRequest = Validation.validate(
      SchoolValidation.SchoolRequest,
      request
    );

    const isSchoolExist = await this.findDataById(schoolId);

    if (!isSchoolExist) {
      throw new ErrorResponse(404, "school not found");
    }

    const [school] = await prisma.$transaction([
      prisma.school.update({
        where: {
          id: schoolId,
        },
        data: {
          name: schoolRequest.name,
        },
      }),
    ]);

    await prisma.$transaction([
      prisma.school_plps.deleteMany({
        where: {
          school_id: school.id,
        },
      }),

      prisma.school_plps.create({
        data: {
          school_id: school.id,
          plp_id: schoolRequest.plp_id,
        },
      }),
    ]);

    return toSchoolResponse(school);
  }

  static async search(queryParams: SchoolQueryParams): Promise<any> {
    const school = await prisma.school.findMany({
      where: {
        name: {
          contains: queryParams.q,
        },
      },
      include: {
        schools: {
          include: {
            plp: true,
          },
        },
      },
    });

    return school;
  }
}
