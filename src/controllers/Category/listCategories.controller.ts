import { Request, Response } from "express";
import listCategoriesService from "../../services/Category/listCategories.service";

const listCategoriesController = async (
  request: Request,
  response: Response
) => {
  const listCategories = await listCategoriesService();

  return response.status(200).json(listCategories);
};
export default listCategoriesController;
