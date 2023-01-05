import { UsersToProperties } from "../entities/usersToProperties.entity";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError";
import AppDataSource from "../data-source";

const verifyIfScheduleAlreadyExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(request.user.id);
  const getUsersToPropertiesRepository =
    AppDataSource.getRepository(UsersToProperties);
  const verifySchedule = await getUsersToPropertiesRepository.findOne({
    where: {
      properties: {
        id: request.body.propertyId,
      },
    },
  });
  console.log(verifySchedule);
  console.log(request.user.id);
  // if (verifySchedule.id === request.body.propertyId) {
  //   throw new AppError("Can't schedule same place twice", 409);
  // }
  return next();
};
export default verifyIfScheduleAlreadyExists;
