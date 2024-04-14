import express from "express";
import { RoleController } from "../controller/role-controller";

const publicRoute = express.Router()

publicRoute.get('/api/role', RoleController.getAll)
publicRoute.post('/api/role', RoleController.store)
publicRoute.get('/api/role/:roleId', RoleController.findById)
publicRoute.delete('/api/role/:roleId', RoleController.destroyById)

export {
    publicRoute
}