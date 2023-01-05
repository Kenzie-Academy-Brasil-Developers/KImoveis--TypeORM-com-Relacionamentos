import { Request, Response } from "express";
import createScheduleService from "../../services/Schedules/createSchedule.service";

const createScheduleController = async (
  request: Request,
  response: Response
) => {
  const data = request.body;
  const userId = request.user.id;
  const dataToSend = { ...data, userId };
  const createSchedule = await createScheduleService(dataToSend);
  return response.status(201).json({ message: createSchedule });
};
export default createScheduleController;
