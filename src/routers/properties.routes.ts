import { Router } from "express";
import createPropertyController from "../controllers/Properties/createPropertie.controller";
import listPropertiesController from "../controllers/Properties/listProperties.controller";
import verifyAddressExists from "../middlewares/ensureAddressExists.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuthToken.middleware";
import verifyCategoryExists from "../middlewares/ensureCategoryExists.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureIsAdm from "../middlewares/ensureIsAdm.middleware";
import { propertiesSerializer } from "../serializers/properties.serializer";

const propertyRouter = Router();

propertyRouter.post(
  "",
  ensureDataIsValidMiddleware(propertiesSerializer),
  ensureAuthMiddleware,
  ensureIsAdm,
  verifyCategoryExists,
  verifyAddressExists,
  createPropertyController
);
propertyRouter.get("", listPropertiesController);

export default propertyRouter;
