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
router.put(
  "/update/:id",
  auth("admin", "super-admin"),
  userController.updateUserRole
);
router.delete(
  "/delete/:id",
  auth("admin", "super-admin"),
  userController.deleteUser
);
router.get("/me", auth("admin", "super-admin", "user"), userController.getMe);

export const userRoutes = router;
