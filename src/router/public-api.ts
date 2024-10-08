import express from "express";
import { UserController } from "../controller/user-controller";
import { AuthController } from "../controller/auth-controller";
import { ConsoleController } from "../controller/console-controller";
import { RoleController } from "../controller/role-controller";

const publicRoute = express.Router();

publicRoute.get("/api", ConsoleController.index);
publicRoute.post("/api/login", AuthController.login);
publicRoute.post("/api/register", UserController.register);
publicRoute.get("/api/role-not-admin", RoleController.getAllNotAdmin);
publicRoute.get("/api/refreshtoken", AuthController.refreshToken);

export { publicRoute };
