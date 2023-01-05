import { Properties } from "../entities/properties.entity";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { AppError } from "../error/AppError";

const verifyPropertyId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const getData = AppDataSource.getRepository(Properties);
  const propertyId = await getData.findOneBy({
    id: request.params.id,
  });

  if (propertyId === null) {
    throw new AppError("Property not found", 404);
  }
  return next();
};
export default verifyPropertyId;
