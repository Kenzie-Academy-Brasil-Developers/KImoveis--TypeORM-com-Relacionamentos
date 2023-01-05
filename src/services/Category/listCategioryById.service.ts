import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { AppError } from "../../error/AppError";

const listCategoriesByIdService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const categories = await categoryRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      properties: true,
    },
  });
  if (!categories) {
    throw new AppError("category not found", 404);
  }

  return categories;
};
export default listCategoriesByIdService;
