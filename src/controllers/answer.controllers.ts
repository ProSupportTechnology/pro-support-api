import { Request, Response } from "express";
import { listAnswersService } from "../services/answers/list.service";
import { iAnswerRequest } from "../interfaces/answers.interfaces";
import { createAnswerService } from "../services/answers/createAnswer.service";

export const listAnswersController = async (req: Request, res: Response) => {
  const questions = await listAnswersService();
  return res.json(questions);
};

export const createAnswerController = async (req: Request, res: Response) => {
  const answerBody: iAnswerRequest = req.body;
  const data = await createAnswerService(answerBody);

  return res.status(201).json(data);
};
