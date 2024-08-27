import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
  jwt__access_secret: process.env.JWT_REFRESH_SECRET,
  jwt__refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt__access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
  jwt__refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_name: process.env.SUPER_ADMIN_NAME,
  cloudinary_cloud_name: process.env.CLOUD_NAME,
  cloudinary_api_key: process.env.API_KEY,
  cloudinary_api_serect: process.env.API_SECRET,
};
