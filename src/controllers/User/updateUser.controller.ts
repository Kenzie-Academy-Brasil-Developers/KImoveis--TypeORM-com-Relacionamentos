import { Request, Response } from "express";
import { IUserUpdateRequest } from "../../interfaces/users";
import updateUserService from "../../services/User/updateUser.service";

const updateUserController = async (request: Request, response: Response) => {
  const userData: IUserUpdateRequest = request.body;
  const userId = request.params.id;
  const updatedUser = await updateUserService(userData, userId);
  return response.json({ message: updatedUser });
};
export default updateUserController;
