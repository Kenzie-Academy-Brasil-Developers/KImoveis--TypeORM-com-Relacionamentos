import { Router } from "express";
import loginUserController from "../controllers/User/loginUser.controller";

const loginRoutes = Router();

loginRoutes.post("", loginUserController);

export default loginRoutes;
