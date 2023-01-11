import { Router } from "express";
import {
  deleteQuestionsController,
  createQuestionController,
  editQuestionController,
  listQuestionsController,
} from "../controllers/question.controllers";
import ensureAuthMiddleware from "../middlewares/ensure.authorization.middleware";

export const questionsRoutes = Router();

questionsRoutes.post("", ensureAuthMiddleware, createQuestionController);
questionsRoutes.patch("/:id", ensureAuthMiddleware, editQuestionController);
questionsRoutes.get("", listQuestionsController);
questionsRoutes.delete("/:id", deleteQuestionsController);
