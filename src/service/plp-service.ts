import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import { PlpRequest, PlpResponse, toPlpResponse } from "../model/plp-model";
import { PlpValidation } from "../validation/plp-validation";
import { Validation } from "../validation/validation";

export class PlpService{
    static async getAll(){
        return await prisma.plp.findMany()
    }

    static async store(request: PlpRequest): Promise<PlpResponse>{
        const plpRequest = Validation.validate(PlpValidation.PlpRequest, request)
        const plp = await prisma.plp.create({
            data: {
                name: plpRequest.name
            }
        })

        return toPlpResponse(plp)
    }

    static async findById(plpId: number): Promise<PlpResponse>{
        const plp = await prisma.plp.findUnique({
            where: {
                id: plpId
            }
        })

        if(plp === null){
            throw new ErrorResponse(404, 'Plp not found')
        }

        return toPlpResponse(plp)
    }

    static async destroyById(plpId: number): Promise<PlpResponse>{
        const isPlpExists = await this.findById(plpId)

        if(isPlpExists === null){
            throw new ErrorResponse(404, 'Plp not found')
        }
        
        const plp = await prisma.plp.delete({
            where: {
                id: plpId
            }
        })

        return toPlpResponse(plp)
    }

    static async updateDataById(request: PlpRequest, plpId: number): Promise<PlpResponse>{
        const plpRequest: PlpRequest = Validation.validate(PlpValidation.PlpRequest, request)

        const isPlpExists = await this.findById(plpId)

        if(!isPlpExists){
            throw new ErrorResponse(404, 'plp not found')
        }

        const plp = await prisma.plp.update({
            where: {
                id: plpId
            },
            data: {
                name: plpRequest.name
            }
        })

        return toPlpResponse(plp)
    }
}