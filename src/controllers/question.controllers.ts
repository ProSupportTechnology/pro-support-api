import { Request, Response } from "express";
import { iQuestionRequest } from "../interfaces/questions.interfaces";
import { createQuestionService } from "../services/questions/create.service";
import { editQuestionService } from "../services/questions/edit.service";

export const createQuestionController = async (req: Request, res: Response) => {
  const questionData: iQuestionRequest = req.body;

  const newQuestion = await createQuestionService(questionData);

  return res.status(201).json(newQuestion);
};

export const editChangedController = async (req: Request, res: Response) => {
  const changedData: iQuestionRequest = req.body;
  const questionId = req.params.id;

  const questionChanged = await editQuestionService(changedData, questionId);

  return res.status(200).json(questionChanged);
};
