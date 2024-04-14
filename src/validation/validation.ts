import { ZodType } from "zod";

export class Validation {
    static validate<Type>(schema: ZodType, data: Type) : Type {
        return schema.parse(data) 
    }
}