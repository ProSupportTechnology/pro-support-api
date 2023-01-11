import { Request, Response } from "express";
import { iQuestionRequest } from "../interfaces/questions.interfaces";
import { createQuestionService } from "../services/questions/createQuestion.service";
import { deleteQuestionsService } from "../services/questions/deleteQuestions.service";
import { editQuestionService } from "../services/questions/editQuestion.service";
import { listQuestionsService } from "../services/questions/listQuestions.service";

export const createQuestionController = async (req: Request, res: Response) => {
  const questionData: iQuestionRequest = req.body;
  const token = req.headers.authorization;

  const newQuestion = await createQuestionService(questionData, token);

  return res.status(201).json(newQuestion);
};

export const editQuestionController = async (req: Request, res: Response) => {
  const changedData: iQuestionRequest = req.body;
  const questionId = req.params.id;

  const questionChanged = await editQuestionService(changedData, questionId);

  return res.status(200).json(questionChanged);
};

export const listQuestionsController = async (req: Request, res: Response) => {
  const questionsList: iQuestionRequest[] = await listQuestionsService();
  return res.status(200).send(questionsList);
};

export const deleteQuestionsController = async (
  req: Request,
  res: Response
) => {
  const questionId: string = req.params.id;
  const status = await deleteQuestionsService(questionId);
  return res.status(status).send({});
};
