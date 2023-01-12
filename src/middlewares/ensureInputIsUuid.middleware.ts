import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export const ensureInputIsUuidMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    const isUuid = regexExp.test(id);
    if (!isUuid) {
      throw new AppError("invalid input syntax for type uuid", 404);
    }
    return next();
  };
