import { Router } from "express";
import {
  listAnswersController,
  createAnswerController,
  editAnswerController,
  deleteAnswerController,
} from "../controllers/answer.controllers";
import ensureAuthMiddleware from "../middlewares/ensure.authorization.middleware";
import { ensureInputIsUuidMiddleware } from "../middlewares/ensureInputIsUuid.middleware";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdm.middleware";

export const answersRoutes = Router();

answersRoutes.get("", ensureAuthMiddleware, ensureUserIsAdmin, listAnswersController);
answersRoutes.post("", ensureAuthMiddleware, ensureUserIsAdmin, createAnswerController);
answersRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsAdmin,
  ensureInputIsUuidMiddleware,
  editAnswerController
);
answersRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsAdmin,
  ensureInputIsUuidMiddleware,
  deleteAnswerController
);
