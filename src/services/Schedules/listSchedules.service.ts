import { UsersToProperties } from "../../entities/usersToProperties.entity";
import AppDataSource from "../../data-source";

const listSchedulesService = async (
  data: string
): Promise<UsersToProperties[]> => {
  const usersToPropertiesRepository =
    AppDataSource.getRepository(UsersToProperties);

  const listSchedules = await usersToPropertiesRepository
    .createQueryBuilder()
    .select("users_properties")
    .from(UsersToProperties, "users_properties")
    .innerJoinAndSelect("users_properties.user", "user")
    .where("users_properties.properties =:propertyId", { propertyId: data })
    .getMany();
  return listSchedules;
};
export default listSchedulesService;
