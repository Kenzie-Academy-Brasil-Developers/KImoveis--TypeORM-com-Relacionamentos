import { Request, Response } from "express";
import listPropertiesService from "../../services/Properties/listProperties.service";

const listPropertiesController = async (
  request: Request,
  response: Response
) => {
  const listProperties = await listPropertiesService();

  return response.status(200).json(listProperties);
};
export default listPropertiesController;
