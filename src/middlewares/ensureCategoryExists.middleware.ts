import { Category } from "../entities/categories.entity";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { AppError } from "../error/AppError";

const verifyCategoryExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const getId = request.body.categoryId;
  const getCategoryRepository = AppDataSource.getRepository(Category);
  const verifyCategory = await getCategoryRepository.findOneBy({
    id: getId,
  });

  if (verifyCategory === undefined || verifyCategory === null) {
    throw new AppError("Category id not found", 404);
  }

  return next();
};
export default verifyCategoryExists;
