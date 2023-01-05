import { Router } from "express";
import createScheduleController from "../controllers/Schedules/createSchedule.controller";
import listSchedulesController from "../controllers/Schedules/listSchedules.controller";
import verifyAddressExists from "../middlewares/ensureAddressExists.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuthToken.middleware";
import ensureIsAdm from "../middlewares/ensureIsAdm.middleware";
import verifyPropertyId from "../middlewares/ensurePropertyIdExists.middleware";

const scheduleRouter = Router();

scheduleRouter.post("", ensureAuthMiddleware, createScheduleController);
scheduleRouter.get(
  "/properties/:id",
  ensureAuthMiddleware,
  ensureIsAdm,
  verifyPropertyId,
  listSchedulesController
);

export default scheduleRouter;
