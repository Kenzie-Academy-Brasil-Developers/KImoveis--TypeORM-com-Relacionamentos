import { User } from "../entities/user.entity";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppDataSource from "../data-source";
import { AppError } from "../error/AppError";

const verifyIsActive = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const idParams = request.params.id;
  const getData = AppDataSource.getRepository(User);
  const verifyIsActive = await getData.findOneBy({
    id: idParams,
  });

  if (verifyIsActive === undefined || verifyIsActive === null) {
    throw new AppError("User not found", 404);
  }
  if (verifyIsActive.isActive === true) {
    return next();
  }

  return response.status(400).json({
    message: "User not active",
  });
};

export default verifyIsActive;
