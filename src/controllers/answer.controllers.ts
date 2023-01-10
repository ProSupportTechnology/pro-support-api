import { Request, Response } from "express";
import { iAnswerRequest } from "../interfaces/answers.interfaces";
import { createAnswerService } from "../services/answers/createAnswer.service";

export const createAnswerController = async (req: Request, res: Response) => {
  const answerBody: iAnswerRequest = req.body;
  const data = await createAnswerService(answerBody);

  return res.status(201).json(data);
};
