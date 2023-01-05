import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import { AppError } from "../error/AppError";
import * as bcrypt from "bcryptjs";

const ensureUpdateDataIsValidMiddleware =
  (schema: AnySchema) =>
  async (request: Request, response: Response, next: NextFunction) => {
    if (request.body.isAdm !== undefined) {
      throw new AppError("Invalid input", 401);
    }
    if (request.body.isActive !== undefined) {
      throw new AppError("Invalid input", 401);
    }
    if (request.body.id !== undefined) {
      throw new AppError("Invalid input", 401);
    }
    if (request.body.password !== undefined) {
      const hashedPassword = await bcrypt.hash(request.body.password, 10);
      request.body.password = hashedPassword;
    }
    try {
      const validatedData = await schema.validate(request.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      request.body = validatedData;
      return next();
    } catch (error) {
      return response.status(400).json({
        error: error.errors,
      });
    }
  };

export default ensureUpdateDataIsValidMiddleware;
