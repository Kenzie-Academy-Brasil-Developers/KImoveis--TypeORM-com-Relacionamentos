import { IUserResponse, IUserUpdateRequest } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { userWithoutPasswordSerializer } from "../../serializers/user.serializer";

const updateUserService = async (
  userData: IUserUpdateRequest,
  userId: string
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: userId,
  });

  const updatedUser = userRepository.create({
    ...findUser,
    updatedAt: new Date(),
    ...userData,
  });
  await userRepository.save(updatedUser);

  const updatedUserWithoutPassword =
    await userWithoutPasswordSerializer.validate(updatedUser, {
      stripUnknown: true,
    });

  return updatedUserWithoutPassword;
};
export default updateUserService;
