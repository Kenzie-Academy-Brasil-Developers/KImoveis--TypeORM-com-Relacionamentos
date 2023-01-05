import createPropertyService from "../../services/Properties/createProperties.service";
import { Request, Response } from "express";

const createPropertyController = async (
  request: Request,
  response: Response
) => {
  const data = request.body;
  const createProperty = await createPropertyService(data);
  return response.status(201).json(createProperty);
};
export default createPropertyController;
