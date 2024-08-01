import { AccommodateTutorTeacherRequest } from "../model/accommodate-model";

export class AccommodateService {
  static async store(request: AccommodateTutorTeacherRequest): Promise<any> {
    return request;
  }
}
