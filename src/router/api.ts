import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { RoleController } from "../controller/role-controller";
import { PlpController } from "../controller/plp-controller";
import { AuthController } from "../controller/auth-controller";
import { SchoolController } from "../controller/school-controller";
import { UserController } from "../controller/user-controller";

const apiRoute = express.Router()
apiRoute.use(authMiddleware)

apiRoute.get('/api/current-user', AuthController.currentUser)

apiRoute.get('/api/role', RoleController.getAll)
apiRoute.post('/api/role', RoleController.store)
apiRoute.get('/api/role/:roleId', RoleController.findById)
apiRoute.put('/api/role/:roleId', RoleController.updateById)
apiRoute.delete('/api/role/:roleId', RoleController.destroyById)

apiRoute.get('/api/plp', PlpController.getAll)
apiRoute.post('/api/plp', PlpController.store)
apiRoute.get('/api/plp/:plpId', PlpController.findById)
apiRoute.delete('/api/plp/:plpId', PlpController.destroyById)

apiRoute.post('/api/school', SchoolController.store)
apiRoute.get('/api/school/:schoolId', SchoolController.findById)
apiRoute.delete('/api/school/:schoolId', SchoolController.destroyById)
apiRoute.put('/api/school/:schoolId', SchoolController.updateById)

apiRoute.get('/api/users', UserController.getAll)
apiRoute.get('/api/users/:userId', UserController.findById)
apiRoute.put('/api/users/:userId', UserController.updateById)
apiRoute.put('/api/users/:userId/change-password', UserController.updatePasswordById)

export {
    apiRoute
}