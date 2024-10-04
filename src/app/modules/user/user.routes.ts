import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../helpers/fileUploads";
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
router.post("/google-login", userController.googleLoginUser);
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
router.get(
  "/profile/me",
  auth("admin", "super-admin", "user"),
  userController.getMe
);
router.patch(
  "/profile/update-my-profile",
  auth("admin", "super-admin", "user"),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return userController.updateMyProfile(req, res, next);
  }
);

export const userRoutes = router;
