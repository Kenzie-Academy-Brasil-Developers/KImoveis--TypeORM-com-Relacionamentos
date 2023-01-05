import { UsersToProperties } from "../../entities/usersToProperties.entity";
import AppDataSource from "../../data-source";
import { IScheduleRequest } from "../../interfaces/schedules";
import { AppError } from "../../error/AppError";
import { User } from "../../entities/user.entity";
import { Properties } from "../../entities/properties.entity";
import { userWithoutPasswordSerializer } from "../../serializers/user.serializer";

const createScheduleService = async (data: IScheduleRequest) => {
  const fullDate = data.date + " " + data.hour;
  const createDate = new Date(fullDate);
  let getYear = createDate.getFullYear().toString();
  let getMonth = (createDate.getMonth() + 1).toString();
  let getDay = createDate.getDate();
  const getDate = createDate.getDay();
  const getHour = createDate.getHours();
  const getMinutes = createDate.getMinutes();
  const getSeconds = createDate.getSeconds();

  let dataYYMMDD = getYear + "-" + getMonth + "-";
  if (getDay < 10) {
    dataYYMMDD += "0" + getDay;
  } else {
    dataYYMMDD += getDay;
  }

  if (getHour < 8 || (getMinutes >= 0 && getHour >= 18 && getSeconds >= 0)) {
    throw new AppError("Out of business hour!", 400);
  }

  if (getDate === 0 || getDate === 6) {
    throw new AppError("Out of business day!", 400);
  }

  const usersToPropertiesRepository =
    AppDataSource.getRepository(UsersToProperties);

  const propertieRepository = AppDataSource.getRepository(Properties);
  const newProperty = await propertieRepository.findOneBy({
    id: data.propertyId,
  });

  if (!newProperty) {
    throw new AppError("Property not found", 404);
  }
  const checkDate = await usersToPropertiesRepository
    .createQueryBuilder("user_properties")
    .innerJoinAndSelect("user_properties.user", "user")
    .where("user.id = :user_Id", { user_Id: data.userId })
    .andWhere("user_properties.date = :date", { date: data.date })
    .andWhere("user_properties.hour = :hour", { hour: data.hour })
    .getMany();

  if (checkDate[0] !== undefined) {
    throw new AppError("Can't schedule at same hour twice", 409);
  }
  const checkProperty = await usersToPropertiesRepository
    .createQueryBuilder("user_properties")
    .innerJoinAndSelect("user_properties.properties", "properties")
    .where("properties.id = :properties_Id", { properties_Id: data.propertyId })
    .andWhere("user_properties.date = :date", { date: data.date })
    .andWhere("user_properties.hour = :hour", { hour: data.hour })
    .getMany();

  if (checkProperty[0] !== undefined) {
    throw new AppError("Property already schedule", 400);
  }

  const userRepository = AppDataSource.getRepository(User);
  const newUser = await userRepository.findOneBy({
    id: data.userId,
  });

  if (!newUser) {
    throw new AppError("User not found", 409);
  }
  const userWithoutPassword = await userWithoutPasswordSerializer.validate(
    newUser,
    { stripUnknown: true }
  );

  const newUsersToProperties = usersToPropertiesRepository.create({
    ...data,
    user: userWithoutPassword,
    properties: newProperty,
  });
  await usersToPropertiesRepository.save(newUsersToProperties);

  return newUsersToProperties;
};
export default createScheduleService;
