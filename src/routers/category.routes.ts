import { Router } from "express";
import createCategoryController from "../controllers/Category/createCategory.controller";
import listCategoriesController from "../controllers/Category/listCategories.controller";
import listCategoriesByIdController from "../controllers/Category/listCategioryById.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuthToken.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import categorySerializer from "../serializers/category.serializer";
import ensureIsAdm from "../middlewares/ensureIsAdm.middleware";

const categoryRoute = Router();

categoryRoute.post(
  "",
  ensureDataIsValidMiddleware(categorySerializer),
  ensureAuthMiddleware,
  ensureIsAdm,
  createCategoryController
);
categoryRoute.get("", listCategoriesController);
categoryRoute.get("/:id/properties", listCategoriesByIdController);

export default categoryRoute;
