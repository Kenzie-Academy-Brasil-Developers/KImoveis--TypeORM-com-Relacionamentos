import { Address } from "../entities/addresses.entity";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { AppError } from "../error/AppError";

const verifyAddressExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const zipCode = request.body.address.zipCode;
  const getData = AppDataSource.getRepository(Address);
  const verifyAddress = await getData.findOneBy({
    zipCode: zipCode,
  });
  if (verifyAddress === undefined || verifyAddress === null) {
    return next();
  }

  throw new AppError("Address already exists", 409);
};
export default verifyAddressExists;
