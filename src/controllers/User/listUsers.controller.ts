import { Request, Response } from "express";
import listUsersService from "../../services/User/listUsers.service";

const listUsersController = async (request: Request, response: Response) => {
  const isAdm = request.user.isAdm;
  const listUsers = await listUsersService(isAdm);
  return response.json(listUsers);
};
export default listUsersController;
