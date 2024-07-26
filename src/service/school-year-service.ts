import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  SchoolYearRequest,
  SchoolYearResponse,
  toSchoolYearResponse,
} from "../model/school-year-model";
import { SchoolYearValidation } from "../validation/school-year-validation";
import { Validation } from "../validation/validation";

export class SchoolYearService {
  static async getAllData(searchQuery: string) {
    const schoolYear = await prisma.school_year.findMany({
      where: {
        name: {
          contains: searchQuery,
        },
      },
    });

    return schoolYear;
  }

  static async findDataById(schoolYearId: number): Promise<SchoolYearResponse> {
    const schoolYear = await prisma.school_year.findUnique({
      where: {
        id: schoolYearId,
      },
    });

    if (!schoolYear) {
      throw new ErrorResponse(404, "school year not found");
    }

    return toSchoolYearResponse(schoolYear);
  }

  static async storeData(
    request: SchoolYearRequest
  ): Promise<SchoolYearResponse> {
    const schoolYearRequest = Validation.validate(
      SchoolYearValidation.schoolYearRequest,
      request
    );

    const schoolYear = await prisma.school_year.create({
      data: {
        name: schoolYearRequest.name,
      },
    });

    return toSchoolYearResponse(schoolYear);
  }

  static async updateDataById(
    request: SchoolYearRequest,
    schoolYearId: number
  ): Promise<SchoolYearResponse> {
    const schoolYearRequest = Validation.validate(
      SchoolYearValidation.schoolYearRequest,
      request
    );

    const isSchoolYearExist = await this.findDataById(schoolYearId);

    if (!isSchoolYearExist) {
      throw new ErrorResponse(404, "school year not found");
    }

    const schoolYear = await prisma.school_year.update({
      where: {
        id: schoolYearId,
      },
      data: {
        name: schoolYearRequest.name,
      },
    });

    return toSchoolYearResponse(schoolYear);
  }

  static async deleteDataById(schoolYearId: number) {
    const isSchoolYearExist = await this.findDataById(schoolYearId);

    if (!isSchoolYearExist) {
      throw new ErrorResponse(404, "school year not found");
    }

    const schoolYear = await prisma.school_year.delete({
      where: {
        id: schoolYearId,
      },
    });

    return toSchoolYearResponse(schoolYear);
  }
}
