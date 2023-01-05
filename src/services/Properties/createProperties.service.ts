import { Address } from "../../entities/addresses.entity";
import { Properties } from "../../entities/properties.entity";
import AppDataSource from "../../data-source";
import { IPropertyRequest } from "../../interfaces/properties";
import {
  addressSerializer,
  propertiesSerializer,
} from "../../serializers/properties.serializer";

const createPropertyService = async (data: IPropertyRequest) => {
  const addressData = await addressSerializer.validate(data.address);
  const propertiesData = await propertiesSerializer.validate(data);
  delete propertiesData.address;

  const addressRepository = AppDataSource.getRepository(Address);
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const newProperty = propertiesRepository.create(propertiesData);
  await propertiesRepository.save(newProperty);

  const newAdress = addressRepository.create(addressData);
  await addressRepository.save(newAdress);

  await AppDataSource.createQueryBuilder()
    .update(Properties)
    .set({ address: newAdress.id, category: data.categoryId })
    .where("id = :id", { id: newProperty.id })
    .execute();

  const returnData = await propertiesRepository
    .createQueryBuilder("properties")
    .innerJoinAndSelect(
      "properties.category",
      "category",
      "category.id = properties.categoryId "
    )
    .innerJoinAndSelect(
      "properties.address",
      "address",
      "address.id = properties.addressId "
    )
    .getOne();

  return returnData;
};
export default createPropertyService;
