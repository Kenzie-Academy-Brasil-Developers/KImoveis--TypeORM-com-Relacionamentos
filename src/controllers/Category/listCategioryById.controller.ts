import listCategoriesByIdService from "../../services/Category/listCategioryById.service";
import { Request, Response } from "express";

const listCategoriesByIdController = async (
  request: Request,
  response: Response
) => {
  const id = request.params.id;
  const listCategory = await listCategoriesByIdService(id);

  return response.status(200).json(listCategory);
};
export default listCategoriesByIdController;
