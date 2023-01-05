import { Request, Response } from "express";
import { ICategoryRequest } from "../../interfaces/categories";
import createCategoryService from "../../services/Category/createCategory.service";

const createCategoryController = async (
  request: Request,
  response: Response
) => {
  const categoryData: ICategoryRequest = request.body;
  const newCategory = await createCategoryService(categoryData);
  return response.status(201).json(newCategory);
};
export default createCategoryController;
