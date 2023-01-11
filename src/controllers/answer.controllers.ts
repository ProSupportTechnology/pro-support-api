import { Request, Response } from "express";
import { listAnswersService } from "../services/answers/list.service";
import { iAnswerRequest } from "../interfaces/answers.interfaces";
import { createAnswerService } from "../services/answers/createAnswer.service";
import { editAnswerService } from "../services/answers/edit.service";
import { deleteAnswerService } from "../services/answers/delete.service";

export const listAnswersController = async (req: Request, res: Response) => {
  const questions = await listAnswersService();
  return res.json(questions);
};

export const createAnswerController = async (req: Request, res: Response) => {
  const answerBody: iAnswerRequest = req.body;
  const data = await createAnswerService(answerBody);

  return res.status(201).json(data);
};

export const editAnswerController = async (req: Request, res: Response) => {
  const body: iAnswerRequest = req.body;
  const answerId: string = req.params.id;
  const question = await editAnswerService(body, answerId);
  return res.json(question);
};

export const deleteAnswerController = async (req: Request, res: Response) => {
  const answerId: string = req.params.id;
  const question = await deleteAnswerService(answerId);
  return res.status(204).json(question);
};
