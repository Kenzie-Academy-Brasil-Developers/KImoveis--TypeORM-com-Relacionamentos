import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../error/AppError";

const deleteUserService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id: userId });
  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  findUser.isActive = false;
  await userRepository.save(findUser);
  return {};
};
export default deleteUserService;
