import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.createUserValidationSchema),
  userController.createUser
);
router.post(
  "/login",
  validateRequest(userValidation.loginUserValidationSchema),
  userController.loginUser
);
router.post("/refresh-token", userController.refreshToken);
router.get(
  "/get-all-users",
  auth("admin", "super-admin"),
  userController.getAllUsers
);

export const userRoutes = router;
