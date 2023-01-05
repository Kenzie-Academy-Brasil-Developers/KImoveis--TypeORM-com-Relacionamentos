import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../error/AppError";

const listUsersService = async (isAdm: boolean): Promise<User[]> => {
  if (isAdm !== true) {
    throw new AppError("Must have admin permissions", 403);
  }
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();
  users.forEach((value) => delete value.password);

  return users;
};

export default listUsersService;
