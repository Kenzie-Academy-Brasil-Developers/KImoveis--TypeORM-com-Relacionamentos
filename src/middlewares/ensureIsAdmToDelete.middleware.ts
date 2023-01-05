import { User } from "../entities/user.entity";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppDataSource from "../data-source";

const verifyIsAdmToDelete = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const idParams = request.params.id;
  const getData = AppDataSource.getRepository(User);
  const verifyIsActive = await getData.findOneBy({
    id: idParams,
  });

  if (request.user.isAdm === true && verifyIsActive?.isActive === true) {
    return next();
  }

  return response.status(403).json({
    message: "You must be adm to delete this accounts.",
  });
};

export default verifyIsAdmToDelete;
