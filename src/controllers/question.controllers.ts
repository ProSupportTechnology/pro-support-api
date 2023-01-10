import { Request, Response } from "express";
import { iQuestionRequest } from "../interfaces/questions.interfaces";
import { createQuestionService } from "../services/questions/create.service";

export const createQuestionController = async (req: Request, res: Response) => {
  const questionData: iQuestionRequest = req.body;

  const newQuestion = await createQuestionService(questionData);

  return res.status(201).json(newQuestion);
};
