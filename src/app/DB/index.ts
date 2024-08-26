import config from "../config";
import { User } from "../modules/user/user.model";

const superAdmin = {
  name: config.super_admin_name,
  email: config.super_admin_email,
  password: config.super_admin_password,
  phone: "01849545637",
  role: "super-admin",
  address: "Gazipur",
};

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({
    role: superAdmin.role,
  });
  if (!isSuperAdminExists) {
    await User.create(superAdmin);
  }
};
export default seedSuperAdmin;
