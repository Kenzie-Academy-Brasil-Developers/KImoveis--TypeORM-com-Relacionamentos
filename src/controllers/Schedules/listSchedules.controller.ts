import listSchedulesService from "../../services/Schedules/listSchedules.service";
import { Request, Response } from "express";

const listSchedulesController = async (
  request: Request,
  response: Response
) => {
  const data = request.params.id;
  const listSchedules = await listSchedulesService(data);
  return response.status(200).json({ schedules: listSchedules });
};
export default listSchedulesController;
