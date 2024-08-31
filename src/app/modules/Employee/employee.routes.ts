import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../helpers/fileUploads";
import auth from "../../middleware/auth";
import { employeeController } from "./employee.controller";
const router = express.Router();

router.post(
  "/create-employee",
  auth("admin", "super-admin"),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return employeeController.createEmployee(req, res, next);
  }
);
router.get("/get", employeeController.getAllEmployee);
router.get("/:id", employeeController.deleteEmployee);
export const employeeRoutes = router;
