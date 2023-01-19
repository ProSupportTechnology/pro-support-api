import { Request, Response } from "express";
import { iQuestionRequest } from "../interfaces/questions.interfaces";
import { createQuestionService } from "../services/questions/createQuestion.service";
import { deleteQuestionsService } from "../services/questions/deleteQuestions.service";
import { editQuestionService } from "../services/questions/editQuestion.service";
import { listQuestionsService } from "../services/questions/listQuestions.service";
import { listQuestionsByUserService } from "../services/questions/listQuestionsByUser.service";

export const createQuestionController = async (req: Request, res: Response) => {
  const questionData: iQuestionRequest = req.body;
  const token: string = req.headers.authorization;
  const id: string = req.user.id;

  const newQuestion = await createQuestionService(questionData, token, id);

  return res.status(201).json(newQuestion);
};

export const editQuestionController = async (req: Request, res: Response) => {
  const changedData: iQuestionRequest = req.body;
  const questionId: string = req.params.id;

  const questionChanged = await editQuestionService(changedData, questionId);

  return res.json(questionChanged);
};

export const listQuestionsController = async (req: Request, res: Response) => {
  const questionsList: iQuestionRequest[] = await listQuestionsService();
  return res.json(questionsList);
};

export const deleteQuestionsController = async (req: Request, res: Response) => {
  const questionId: string = req.params.id;
  const response = await deleteQuestionsService(questionId);
  return res.status(204).json(response);
};

export const listQuestionsByUserController = async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  const questions = await listQuestionsByUserService(userId);
  return res.json(questions);
};
