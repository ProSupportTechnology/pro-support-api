import { Router } from "express";
import {
  deleteQuestionsController,
  createQuestionController,
  editQuestionController,
  listQuestionsController,
} from "../controllers/question.controllers";
import { ensureAuthMiddleware } from "../middlewares/ensure.authorization.middleware";
import { ensureDataValidationMiddleware } from "../middlewares/ensureDataValidation.middleware";
import { ensureInputIsUuidMiddleware } from "../middlewares/ensureInputIsUuid.middleware";
import {
  questionSchema,
  editQuestionSchema,
} from "../schemas/question.schemas";

export const questionsRoutes = Router();

questionsRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDataValidationMiddleware(questionSchema),
  createQuestionController
);

questionsRoutes.patch(
  "/:id",
  ensureInputIsUuidMiddleware,
  ensureAuthMiddleware,
  ensureDataValidationMiddleware(editQuestionSchema),
  editQuestionController
);
questionsRoutes.get("", ensureAuthMiddleware, listQuestionsController);
questionsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureInputIsUuidMiddleware,
  deleteQuestionsController
);
