import { NextFunction, Response } from "express";
import { UserInterface } from "../interface/user-interface";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../app/database";

export const authMiddleware = async(req: UserInterface, res: Response, next: NextFunction) => {
    const token: string = req.get('Authorization')!

    if(!token){
        return res.status(401).json({
            data: 'unauthorized'
        }).end()
    }

    const tokenSplit = token.split(' ')

    try {
        const decoded = Jwt.verify(tokenSplit[1], 'swefijlzc22@#()33vsd') as JwtPayload

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        })

        req.user = user!
        next()
    } catch (error) {
        res.status(401).json({
            data: error
        })
    }
}