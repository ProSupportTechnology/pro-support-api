import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors";

export const ensureUserIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);
  const verifyUser = await userRepository.findOneBy({ id: req.user.id });
  if (!verifyUser.isAdm) {
    throw new AppError("Missing admin authorization", 403);
  }

  return next();
};
