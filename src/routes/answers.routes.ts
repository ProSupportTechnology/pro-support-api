import { Router } from "express";
import {
  listAnswersController,
  createAnswerController,
  editAnswerController,
  deleteAnswerController,
} from "../controllers/answer.controllers";
import ensureAuthMiddleware from "../middlewares/ensure.authorization.middleware";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdm.middleware";

export const answersRoutes = Router();

answersRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureUserIsAdmin,
  listAnswersController
);
answersRoutes.post("", createAnswerController);
answersRoutes.patch("/:id", editAnswerController);
answersRoutes.delete("/:id", deleteAnswerController);
