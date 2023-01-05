import { User } from "../entities/user.entity";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { AppError } from "../error/AppError";

const verifyIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const idParams = request.params.id;
  const getData = AppDataSource.getRepository(User);
  const verifyUser = await getData.findOneBy({
    id: idParams,
  });

  if (verifyUser === undefined || verifyUser === null) {
    throw new AppError("User not found", 404);
  }
  if (verifyUser.id) {
    return next();
  }
  return response.status(401).json({
    message: "ID invalid",
  });
};
export default verifyIdExists;
