import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAddressRequest, IPropertyRequest } from "../interfaces/properties";

const addressSerializer: SchemaOf<IAddressRequest> = yup.object().shape({
  district: yup.string().required(),
  zipCode: yup.string().max(8).required(),
  number: yup.string().notRequired(),
  city: yup.string().required(),
  state: yup.string().max(2).required(),
});

const propertiesSerializer: SchemaOf<IPropertyRequest> = yup.object().shape({
  value: yup.number().required(),
  size: yup.number().required(),
  address: addressSerializer,
  categoryId: yup.string().required(),
});

export { addressSerializer, propertiesSerializer };
