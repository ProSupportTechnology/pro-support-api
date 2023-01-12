import { Router } from "express";
import {
  deleteQuestionsController,
  createQuestionController,
  editQuestionController,
  listQuestionsController,
} from "../controllers/question.controllers";
import ensureAuthMiddleware from "../middlewares/ensure.authorization.middleware";
import { ensureInputIsUuidMiddleware } from "../middlewares/ensureInputIsUuid.middleware";

export const questionsRoutes = Router();

questionsRoutes.post("", ensureAuthMiddleware, createQuestionController);
questionsRoutes.patch("/:id", ensureInputIsUuidMiddleware, ensureAuthMiddleware, editQuestionController);
questionsRoutes.get("", ensureAuthMiddleware, listQuestionsController);
questionsRoutes.delete("/:id", ensureAuthMiddleware, ensureInputIsUuidMiddleware, deleteQuestionsController);
