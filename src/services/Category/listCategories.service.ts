import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";

const listCategoriesService = async (): Promise<Category[]> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const category = await categoryRepository.find();

  return category;
};
export default listCategoriesService;
