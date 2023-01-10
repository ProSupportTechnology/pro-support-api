import { Request, Response } from "express";
import { iQuestionRequest } from "../interfaces/questions.interfaces";
import { iQuestionResponse } from "../interfaces/questions.interfaces";
import { createQuestionService } from "../services/questions/create.service";
import { deleteQuestionsService } from "../services/questions/deleteQuestions.service";
import { listQuestionsService } from "../services/questions/listQuestions.service";

export const createQuestionController = async (req: Request, res: Response) => {
  const questionData: iQuestionRequest = req.body;

  const newQuestion = await createQuestionService(questionData);

  return res.status(201).json(newQuestion);
};

export const listQuestionsController = async (req: Request, res: Response) => {
  const questionsList: Promise<iQuestionResponse[]> = listQuestionsService();
  return res.status(200).send(questionsList);
};

export const deleteQuestionsController = async (
  req: Request,
  res: Response
) => {
  const questionId: string = req.params.id;
  const deletedQuestion = deleteQuestionsService(questionId);
  return res.status(204).send({});
};
