import express from "express";
import { RoleController } from "../controller/role-controller";

const publicRoute = express.Router()

publicRoute.post('/api/role', RoleController.store)

export {
    publicRoute
}