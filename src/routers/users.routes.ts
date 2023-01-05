import { Router } from "express";
import createUserController from "../controllers/User/createUser.controller";
import {
  userSerializer,
  userUpdateSerializer,
} from "../serializers/user.serializer";
import listUsersController from "../controllers/User/listUsers.controller";
import updateUserController from "../controllers/User/updateUser.controller";
import deleteUserController from "../controllers/User/deleteUser.controller";

import verifyIsAdmOrOwner from "../middlewares/ensureIsAdmOrOwner.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuthToken.middleware";
import verifyIsAdmToDelete from "../middlewares/ensureIsAdmToDelete.middleware";
import verifyIdExists from "../middlewares/ensureIdExists.middleware";
import verifyIsActive from "../middlewares/ensureIsActive.middleware";
import ensureUpdateDataIsValidMiddleware from "../middlewares/ensureUpdateDataIsValid.middleware";

const userRouters = Router();

userRouters.post(
  "",
  ensureDataIsValidMiddleware(userSerializer),
  createUserController
);
userRouters.get("", ensureAuthMiddleware, listUsersController);

userRouters.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUpdateDataIsValidMiddleware(userUpdateSerializer),
  verifyIdExists,
  verifyIsAdmOrOwner,
  updateUserController
);
userRouters.delete(
  "/:id",
  ensureAuthMiddleware,
  verifyIsActive,
  verifyIsAdmToDelete,
  deleteUserController
);
export default userRouters;
