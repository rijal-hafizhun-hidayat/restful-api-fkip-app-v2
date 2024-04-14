import {Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ErrorResponse } from "../error/error-response";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof ZodError){
        res.status(400).json({
            errors: `Validation errors: +${JSON.stringify(error)}`
        })
    }
    else if(error instanceof ErrorResponse){
        res.status(error.status).json({
            errors: error.message
        })
    }
    else{
        res.status(500).json({
            errors: error.message
        })
    }
}