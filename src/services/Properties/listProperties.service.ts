import { Properties } from "../../entities/properties.entity";
import AppDataSource from "../../data-source";

const listPropertiesService = async () => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const properties = propertiesRepository.find();

  return properties;
};
export default listPropertiesService;
