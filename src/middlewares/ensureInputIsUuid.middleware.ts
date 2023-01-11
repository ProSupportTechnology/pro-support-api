import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export const ensureInputIsUuidMiddleware =
  (entity: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const verifyIdExist = await AppDataSource.getRepository(entity);
      if (!verifyIdExist) {
        throw new AppError("Not found.", 404);
      }
    } catch (error) {
      console.log(error, "oi");
      if (error.statusCode) {
        throw new AppError(error.message.message, error.statusCode);
      }
      if (error.routine === "string_to_uuid") {
        throw new AppError(
          "The id passed by parameter must be of type uuid",
          404
        );
      }
    }

    return next();
  };
