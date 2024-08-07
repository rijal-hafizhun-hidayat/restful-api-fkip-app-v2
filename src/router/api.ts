import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { RoleController } from "../controller/role-controller";
import { PlpController } from "../controller/plp-controller";
import { AuthController } from "../controller/auth-controller";
import { SchoolController } from "../controller/school-controller";
import { UserController } from "../controller/user-controller";
import { SchoolYearController } from "../controller/school-year-controller";
import { AccommodateController } from "../controller/accommodate-controller";

const apiRoute = express.Router();
apiRoute.use(authMiddleware);

apiRoute.get("/api/me", AuthController.currentUser);
apiRoute.put("/api/me", AuthController.updateProfile);
apiRoute.put("/api/me/update-password", AuthController.updatePassword);
apiRoute.get("/api/me/user-plp", AuthController.getUserPlpByUserId);
apiRoute.post("/api/me/user-plp", AuthController.storeUserPlp);
apiRoute.get("/api/me/user-plp/:userPlpId", AuthController.getUserPlpById);
apiRoute.delete(
  "/api/me/user-plp/:userPlpId",
  AuthController.destroyUserPlpById
);
apiRoute.put("/api/me/user-plp/:userPlpId", AuthController.updateUserPlpById);
apiRoute.get("/api/refreshtoken", AuthController.refreshToken);

apiRoute.get("/api/role", RoleController.getAll);
apiRoute.post("/api/role", RoleController.store);
apiRoute.get("/api/role/:roleId", RoleController.findById);
apiRoute.put("/api/role/:roleId", RoleController.updateById);
apiRoute.delete("/api/role/:roleId", RoleController.destroyById);

apiRoute.get("/api/plp", PlpController.getAll);
apiRoute.post("/api/plp", PlpController.store);
apiRoute.get("/api/plp/:plpId", PlpController.findById);
apiRoute.delete("/api/plp/:plpId", PlpController.destroyById);
apiRoute.put("/api/plp/:plpId", PlpController.updateById);

apiRoute.get("/api/school", SchoolController.getAll);
apiRoute.post("/api/school", SchoolController.store);
apiRoute.get("/api/school/:schoolId", SchoolController.findById);
apiRoute.delete("/api/school/:schoolId", SchoolController.destroyById);
apiRoute.put("/api/school/:schoolId", SchoolController.updateById);

apiRoute.get("/api/users", UserController.getAll);
apiRoute.get("/api/users/:userId", UserController.findById);
apiRoute.put("/api/users/:userId", UserController.updateById);
apiRoute.delete("/api/users/:userId", UserController.destroyById);
apiRoute.put(
  "/api/users/:userId/change-password",
  UserController.updatePasswordById
);
apiRoute.get("/api/users/:roleId/role", UserController.getAllByRoleId);

apiRoute.get("/api/school-year", SchoolYearController.getAll);
apiRoute.post("/api/school-year", SchoolYearController.store);
apiRoute.get("/api/school-year/:schoolYearId", SchoolYearController.findById);
apiRoute.put("/api/school-year/:schoolYearId", SchoolYearController.updateById);
apiRoute.delete(
  "/api/school-year/:schoolYearId",
  SchoolYearController.deleteById
);

apiRoute.delete(
  "/api/accommodate/:accommodateId",
  AccommodateController.destroyAccommodateByAccommodateId
);
apiRoute.get(
  "/api/accommodate/tutor-teacher",
  AccommodateController.getTutorTeacherByUserId
);
apiRoute.get(
  "/api/accommodate/tutor-teacher/:accommodateId",
  AccommodateController.getTutorTeacherByAccommodateId
);
apiRoute.put(
  "/api/accommodate/tutor-teacher/:accommodateId",
  AccommodateController.updateTutorTeacherByAccommodateId
);
apiRoute.post(
  "/api/accommodate/tutor-teacher",
  AccommodateController.storeTutorTeacher
);

apiRoute.get(
  "/api/accommodate/colleger",
  AccommodateController.getCollegerByUserId
);

apiRoute.post("/api/accommodate/colleger", AccommodateController.storeColleger);
apiRoute.get(
  "/api/accommodate/colleger/:accommodateId",
  AccommodateController.getCollegerByAccommodateId
);

apiRoute.get(
  "/api/accommodate/dpl",
  AccommodateController.getAccommodateDplByUserId
);
apiRoute.post(
  "/api/accommodate/dpl",
  AccommodateController.storeAccommodateDpl
);
apiRoute.get(
  "/api/accommodate/dpl/:accommodateId",
  AccommodateController.getAccommodateDplByAccommodateId
);
apiRoute.put(
  "/api/accommodate/dpl/:accommodateId",
  AccommodateController.updateAccommodateDplByAccommodateId
);
export { apiRoute };
