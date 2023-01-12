import { Router } from "express";
import {
  listAnswersController,
  createAnswerController,
  editAnswerController,
  deleteAnswerController,
} from "../controllers/answer.controllers";
import ensureAuthMiddleware from "../middlewares/ensure.authorization.middleware";
import ensureDataValidationMiddleware from "../middlewares/ensureDataValidation.middleware";
import { ensureInputIsUuidMiddleware } from "../middlewares/ensureInputIsUuid.middleware";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdm.middleware";
import { bodyAnswerSchema } from "../schemas/answer.schemas";

export const answersRoutes = Router();

answersRoutes.get("", ensureAuthMiddleware, ensureUserIsAdmin, listAnswersController);
answersRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureUserIsAdmin,
  ensureDataValidationMiddleware(bodyAnswerSchema),
  createAnswerController
);
answersRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsAdmin,
  ensureInputIsUuidMiddleware,
  ensureDataValidationMiddleware(bodyAnswerSchema),
  editAnswerController
);
answersRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsAdmin,
  ensureInputIsUuidMiddleware,
  deleteAnswerController
);
