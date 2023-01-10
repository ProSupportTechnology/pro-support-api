import { Request, Response } from "express";
import { listAnswersService } from "../services/answers/list.service";

export const listAnswersController = async (req: Request, res: Response) => {
  const questions = await listAnswersService();
  return res.json(questions);
};
