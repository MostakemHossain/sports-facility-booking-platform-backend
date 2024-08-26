import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../config";
import AppError from "../errors/appError";
import { jwtHelpers } from "../helpers/jwtHelper";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authorizationHeader = req.headers.authorization;

      if (!authorizationHeader) {
        throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized");
      }

      const token = authorizationHeader.split(" ")[1];

      if (!token) {
        throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized");
      }

      const verifiedUser = await jwtHelpers.verifyToken(
        token,
        config.jwt__access_secret as string
      );
      if (!verifiedUser) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new AppError(401, "You have no access to this route");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
