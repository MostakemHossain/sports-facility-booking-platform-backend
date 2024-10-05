export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user" | "super-admin";
  address: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
};

export type TLoginUser = {
  id: string;
  name?: string;
  email: string;
  password: string;
};
