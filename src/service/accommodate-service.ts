import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  AccommodateRequest,
  AccommodateResponse,
  toAccommodateResponse,
} from "../model/accommodate-model";
import { AccommodateValidation } from "../validation/accommodate-validation";
import { Validation } from "../validation/validation";

export class AccommodateService {
  static async getTutorTeacherByUserId(userId: number): Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
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
    });

    if (user === null) {
      throw new ErrorResponse(404, "user not found");
    }

    const queryAccomodate: any = {};

    if (user.roles[0].role.name === "mahasiswa") {
      queryAccomodate.user_id_colleger = user.id;
      queryAccomodate.user_id_tutor_teacher = {
        not: null,
      };
    } else if (user.roles[0].role.name === "dpl") {
      queryAccomodate.user_id_dpl = user.id;
      queryAccomodate.user_id_tutor_teacher = {
        not: null,
      };
    }

    const accommodate = await prisma.accommodates.findMany({
      where: queryAccomodate,
      select: {
        id: true,
        user_tutor_teacher: {
          select: {
            name: true,
          },
        },
      },
    });

    return accommodate;
  }

  static async getTutorTeacherByAccommodateId(
    accommodateId: number
  ): Promise<any> {
    const accommodate = await prisma.accommodates.findUnique({
      where: {
        id: accommodateId,
      },
      select: {
        user_tutor_teacher: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (accommodate === null) {
      throw new ErrorResponse(404, "accommodate not found");
    }

    return accommodate;
  }

  static async storeTutorTeacher(
    request: AccommodateRequest
  ): Promise<AccommodateResponse> {
    const requestBody: AccommodateRequest = Validation.validate(
      AccommodateValidation.accommodateStoreValidation,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        id: requestBody.user_id,
      },
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
    });

    const accommodateUser = await prisma.user.findUnique({
      where: {
        id: requestBody.user_id_accommodate,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (user === null) {
      throw new ErrorResponse(404, "user not found");
    }

    if (accommodateUser === null) {
      throw new ErrorResponse(404, "accommodate user not found");
    }

    const queryAccomodate: any = {};

    if (user.roles[0].role.name === "mahasiswa") {
      queryAccomodate.user_id_colleger = user.id;
      queryAccomodate.user_id_tutor_teacher = accommodateUser.id;
    } else if (user.roles[0].role.name === "dpl") {
      queryAccomodate.user_id_dpl = user.id;
      queryAccomodate.user_id_tutor_teacher = accommodateUser.id;
    }

    const isAccommodateExists = await prisma.accommodates.count({
      where: queryAccomodate,
    });

    if (isAccommodateExists != 0) {
      throw new ErrorResponse(404, "accommodate user already exist");
    }

    const [accommodate] = await prisma.$transaction([
      prisma.accommodates.create({
        data: queryAccomodate,
      }),
    ]);

    return toAccommodateResponse(accommodate);
  }

  static async updateTutorTeacherByAccommodateId(
    request: AccommodateRequest,
    accommodateId: number
  ): Promise<any> {
    const requestBody = Validation.validate(
      AccommodateValidation.accommodateUpdateValidation,
      request
    );

    const [accommodate] = await prisma.$transaction([
      prisma.accommodates.update({
        where: {
          id: accommodateId,
        },
        data: {
          user_id_tutor_teacher: requestBody.user_id_accommodate,
        },
      }),
    ]);

    return accommodate;
  }

  static async getCollegerByUserId(userId: number): Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
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
    });

    if (user === null) {
      throw new ErrorResponse(404, "user not found");
    }

    const queryAccomodate: any = {};

    if (user.roles[0].role.name === "guru pamong") {
      queryAccomodate.user_id_tutor_teacher = user.id;
      queryAccomodate.user_id_colleger = {
        not: null,
      };
    } else if (user.roles[0].role.name === "dpl") {
      queryAccomodate.user_id_dpl = user.id;
      queryAccomodate.user_id_colleger = {
        not: null,
      };
    }

    const accommodate = await prisma.accommodates.findMany({
      where: queryAccomodate,
      select: {
        id: true,
        user_colleger: {
          select: {
            name: true,
          },
        },
      },
    });

    return accommodate;
  }

  static async storeColleger(
    request: AccommodateRequest
  ): Promise<AccommodateResponse> {
    const requestBody: AccommodateRequest = Validation.validate(
      AccommodateValidation.accommodateStoreValidation,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        id: requestBody.user_id,
      },
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
    });

    const accommodateUser = await prisma.user.findUnique({
      where: {
        id: requestBody.user_id_accommodate,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (user === null) {
      throw new ErrorResponse(404, "user not found");
    }

    if (accommodateUser === null) {
      throw new ErrorResponse(404, "accommodate user not found");
    }

    const queryAccomodate: any = {};

    if (user.roles[0].role.name === "guru pamong") {
      queryAccomodate.user_id_colleger = accommodateUser.id;
      queryAccomodate.user_id_tutor_teacher = user.id;
    } else if (user.roles[0].role.name === "dpl") {
      queryAccomodate.user_id_dpl = user.id;
      queryAccomodate.user_id_colleger = accommodateUser.id;
    }

    const isAccommodateExists = await prisma.accommodates.count({
      where: queryAccomodate,
    });

    if (isAccommodateExists != 0) {
      throw new ErrorResponse(404, "accommodate user already exist");
    }

    const [accommodate] = await prisma.$transaction([
      prisma.accommodates.create({
        data: queryAccomodate,
      }),
    ]);

    return toAccommodateResponse(accommodate);
  }

  static async getCollegerByAccommodateId(accommodateId: number): Promise<any> {
    const accommodate = await prisma.accommodates.findUnique({
      where: {
        id: accommodateId,
      },
      select: {
        user_colleger: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (accommodate === null) {
      throw new ErrorResponse(404, "accommodate not found");
    }

    return accommodate;
  }

  static async destroyAccommodateByAccommodateId(
    accommodateId: number
  ): Promise<AccommodateResponse> {
    const [accommodate] = await prisma.$transaction([
      prisma.accommodates.delete({
        where: {
          id: accommodateId,
        },
      }),
    ]);

    return toAccommodateResponse(accommodate);
  }

  static async getAccommodateDplByUserId(userId: number): Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
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
    });

    if (user === null) {
      throw new ErrorResponse(404, "user not found");
    }

    const queryAccomodate: any = {};

    if (user.roles[0].role.name === "guru pamong") {
      queryAccomodate.user_id_tutor_teacher = user.id;
      queryAccomodate.user_id_dpl = {
        not: null,
      };
    } else if (user.roles[0].role.name === "mahasiswa") {
      queryAccomodate.user_id_colleger = user.id;
      queryAccomodate.user_id_dpl = {
        not: null,
      };
    }

    const accommodate = await prisma.accommodates.findMany({
      where: queryAccomodate,
      select: {
        id: true,
        user_dpl: {
          select: {
            name: true,
          },
        },
      },
    });

    return accommodate;
  }

  static async storeAccommodateDpl(
    request: AccommodateRequest
  ): Promise<AccommodateResponse> {
    const requestBody: AccommodateRequest = Validation.validate(
      AccommodateValidation.accommodateStoreValidation,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        id: requestBody.user_id,
      },
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
    });

    const accommodateUser = await prisma.user.findUnique({
      where: {
        id: requestBody.user_id_accommodate,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (user === null) {
      throw new ErrorResponse(404, "user not found");
    }

    if (accommodateUser === null) {
      throw new ErrorResponse(404, "accommodate user not found");
    }

    const queryAccomodate: any = {};

    if (user.roles[0].role.name === "guru pamong") {
      queryAccomodate.user_id_dpl = accommodateUser.id;
      queryAccomodate.user_id_tutor_teacher = user.id;
    } else if (user.roles[0].role.name === "mahasiswa") {
      queryAccomodate.user_id_colleger = user.id;
      queryAccomodate.user_id_dpl = accommodateUser.id;
    }

    const isAccommodateExists = await prisma.accommodates.count({
      where: queryAccomodate,
    });

    if (isAccommodateExists != 0) {
      throw new ErrorResponse(404, "accommodate user already exist");
    }

    const [accommodate] = await prisma.$transaction([
      prisma.accommodates.create({
        data: queryAccomodate,
      }),
    ]);

    return toAccommodateResponse(accommodate);
  }

  static async getAccommodateDplByAccommodateId(
    accommodateId: number
  ): Promise<any> {
    const accommodate = await prisma.accommodates.findUnique({
      where: {
        id: accommodateId,
      },
      select: {
        user_dpl: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (accommodate === null) {
      throw new ErrorResponse(404, "accommodate not found");
    }

    return accommodate;
  }

  static async updateAccommodateDplByAccommodateId(
    accommodateId: number,
    request: AccommodateRequest
  ): Promise<AccommodateResponse> {
    const requestBody: AccommodateRequest = Validation.validate(
      AccommodateValidation.accommodateUpdateValidation,
      request
    );

    const [accommodate] = await prisma.$transaction([
      prisma.accommodates.update({
        where: {
          id: accommodateId,
        },
        data: {
          user_id_dpl: requestBody.user_id_accommodate,
        },
      }),
    ]);

    return toAccommodateResponse(accommodate);
  }

  static async updateAccommodateCollegerByAccommodateId(
    accommodateId: number,
    request: AccommodateRequest
  ): Promise<AccommodateResponse> {
    const requestBody: AccommodateRequest = Validation.validate(
      AccommodateValidation.accommodateUpdateValidation,
      request
    );

    const [accommodate] = await prisma.$transaction([
      prisma.accommodates.update({
        where: {
          id: accommodateId,
        },
        data: {
          user_id_colleger: requestBody.user_id_accommodate,
        },
      }),
    ]);

    return toAccommodateResponse(accommodate);
  }
}
