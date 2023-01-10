import { Request, Response } from "express";
import { listQuestionsService } from "../services/questions/list.service";

export const listQuestionsController = async (req: Request, res: Response) => {
  const questions = await listQuestionsService();
  return res.json(questions);
};
