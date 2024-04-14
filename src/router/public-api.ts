import express from "express";
import { RoleController } from "../controller/role-controller";

const publicRoute = express.Router()

publicRoute.get('/api/role', RoleController.getAll)
publicRoute.post('/api/role', RoleController.store)

export {
    publicRoute
}