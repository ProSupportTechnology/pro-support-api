import { Router } from "express";
import {
  deleteQuestionsController,
  createQuestionController,
  editQuestionController,
  listQuestionsController,
} from "../controllers/question.controllers";

export const questionsRoutes = Router();

questionsRoutes.post("", createQuestionController);
questionsRoutes.patch("/:id", editQuestionController);
questionsRoutes.get("", listQuestionsController);
questionsRoutes.delete("/:id", deleteQuestionsController);
