import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import { SchoolRequest, toSchoolResponse } from "../model/school-model";
import { SchoolValidation } from "../validation/school-validation";
import { Validation } from "../validation/validation";

export class SchoolService{
    static async storeData(request: SchoolRequest){
        const schoolRequest = Validation.validate(SchoolValidation.SchoolRequest, request)
        
        const school = await prisma.school.create({
            data: {
                name: schoolRequest.name,
                plp_id: schoolRequest.plp_id
            }
        })

        return toSchoolResponse(school)
    }

    static async findDataById(schoolId: number){
        const school = await prisma.school.findUnique({
            where: {
                id: schoolId
            }
        })

        if(!school){
            throw new ErrorResponse(404, 'school not found')
        }

        return toSchoolResponse(school)
    }

    static async deleteDataById(schoolId: number){
        const isSchoolExist = await this.findDataById(schoolId)

        if(!isSchoolExist){
            throw new ErrorResponse(404, 'school not found')
        }

        const schoolDelete = await prisma.school.delete({
            where: {
                id: schoolId
            }
        })

        return toSchoolResponse(schoolDelete)
    }

    static async updateDataById(request: SchoolRequest, schoolId: number){
        const schoolRequest = Validation.validate(SchoolValidation.SchoolRequest, request)

        const isSchoolExist = await this.findDataById(schoolId)

        if(!isSchoolExist){
            throw new ErrorResponse(404, 'school not found')
        }

        const school = await prisma.school.update({
            where: {
                id: schoolId
            },
            data: {
                name: schoolRequest.name,
                plp_id: schoolRequest.plp_id
            }
        })

        return toSchoolResponse(school)
    }
}