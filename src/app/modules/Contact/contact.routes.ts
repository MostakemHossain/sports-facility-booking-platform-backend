import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { contactController } from "./contact.controller";
import { contactValidation } from "./contact.validation";
const router = express.Router();

router.post(
  "/create-contact",
  validateRequest(contactValidation.createContact),
  contactController.createContact
);
router.get("/", contactController.getAllContact);
router.delete("/:id", contactController.deleteContact);

export const contactRoutes = router;
