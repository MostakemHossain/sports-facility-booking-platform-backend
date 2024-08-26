import express from "express";
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

export const userRoutes = router;
