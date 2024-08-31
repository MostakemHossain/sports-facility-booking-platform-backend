import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { contactController } from "./contact.controller";
import { contactValidation } from "./contact.validation";
const router = express.Router();

router.post(
  "/create-contact",
  validateRequest(contactValidation.createContact),
  contactController.createContact
);
router.get("/", auth("admin", "super-admin"), contactController.getAllContact);
router.delete("/:id", contactController.deleteContact);

export const contactRoutes = router;
