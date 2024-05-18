import { NextFunction, Response } from "express";
import { UserInterface } from "../interface/user-interface";
import Jwt from "jsonwebtoken";
import { prisma } from "../app/database";

export const authMiddleware = async(req: UserInterface, res: Response, next: NextFunction) => {
    const token: string = req.get('Authorization')!

    if(!token){
        return res.status(401).json({
            data: 'unauthorized'
        }).end()
    }

    const tokenSplit = token.split(' ')

    Jwt.verify(tokenSplit[1], 'swefijlzc22@#()33vsd', async function(err, decoded) {
        if(err){
            res.status(401).json({
                errorToken: err.name,
                errorMessage: err.message,
            }).end()
        }
        else{
            const user = await prisma.user.findFirst({
                where: {
                    token: tokenSplit[1]
                }
            })
    
            if(!user){
                res.status(401).json({
                    data: 'unauthorized'
                }).end()
            }
            else{
                req.user = user
                next();
            }
        }
    });
}