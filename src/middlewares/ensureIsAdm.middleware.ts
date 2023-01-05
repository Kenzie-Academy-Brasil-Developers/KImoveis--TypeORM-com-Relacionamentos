import { User } from "../entities/user.entity";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppDataSource from "../data-source";

const ensureIsAdm = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.user.isAdm === true) {
    return next();
  }

  return response.status(403).json({
    message: "You must be adm to create a category.",
  });
};

export default ensureIsAdm;
