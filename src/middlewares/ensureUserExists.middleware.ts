import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors";

export const ensureUserExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const paramsUserId: string = request.params.id;

  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOneBy({ id: paramsUserId });

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  return next();
};
