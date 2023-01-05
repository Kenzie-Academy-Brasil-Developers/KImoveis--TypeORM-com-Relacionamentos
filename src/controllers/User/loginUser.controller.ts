import loginUserService from "../../services/User/loginUser.service";
import { Request, Response } from "express";
import { ILoginRequest } from "../../interfaces/login";

const loginUserController = async (request: Request, response: Response) => {
  const loginData: ILoginRequest = request.body;
  const token = await loginUserService(loginData);
  return response.json({ token });
};
export default loginUserController;
