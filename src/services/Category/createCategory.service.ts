import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../error/AppError";
import {
  ICategoryRequest,
  ICategoryResponse,
} from "../../interfaces/categories";

const createCategoryService = async (
  categoryData: ICategoryRequest
): Promise<ICategoryResponse> => {
  const userRepository = AppDataSource.getRepository(Category);
  const findCategory = await userRepository.findOneBy({
    name: categoryData.name,
  });
  if (findCategory !== null) {
    throw new AppError("Category already exists", 409);
  }

  const createCategory = userRepository.create(categoryData);
  await userRepository.save(createCategory);

  return createCategory;
};
export default createCategoryService;
