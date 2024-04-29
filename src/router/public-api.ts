import express from "express";
import { RoleController } from "../controller/role-controller";
import { PlpController } from "../controller/plp-controller";
import { UserController } from "../controller/user-controller";

const publicRoute = express.Router()

publicRoute.get('/api/role', RoleController.getAll)
publicRoute.post('/api/role', RoleController.store)
publicRoute.get('/api/role/:roleId', RoleController.findById)
publicRoute.put('/api/role/:roleId', RoleController.updateById)
publicRoute.delete('/api/role/:roleId', RoleController.destroyById)

publicRoute.get('/api/plp', PlpController.getAll)
publicRoute.post('/api/plp', PlpController.store)
publicRoute.get('/api/plp/:plpId', PlpController.findById)
publicRoute.delete('/api/plp/:plpId', PlpController.destroyById)

publicRoute.post('/api/register', UserController.register)

export {
    publicRoute
}