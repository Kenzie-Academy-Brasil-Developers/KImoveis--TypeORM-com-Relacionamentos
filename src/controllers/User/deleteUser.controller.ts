import { Request, Response } from "express";
import deleteUserService from "../../services/User/deleteUser.service";

const deleteUserController = async (request: Request, response: Response) => {
  const deleteUser = await deleteUserService(request.params.id);
  return response.status(204).json(deleteUser);
};
export default deleteUserController;
