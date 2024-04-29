import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";

const apiRoute = express.Router()
apiRoute.use(authMiddleware)


export {
    apiRoute
}