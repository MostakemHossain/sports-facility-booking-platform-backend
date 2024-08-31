import { fileUploader } from "../../helpers/fileUploads";
import { Employee } from "./employee.model";

const createEmployee = async (req: any) => {
  const file = req.file;
  if (file) {
    const uploadedProfileImage = await fileUploader.uploadToCloudinary(file);
    if (uploadedProfileImage && uploadedProfileImage.secure_url) {
      req.body.image = uploadedProfileImage.secure_url;
    }
  }
  const employee = await Employee.create({
    ...req.body,
  });
  return employee;
};

export const employeeService = {
  createEmployee,
};
