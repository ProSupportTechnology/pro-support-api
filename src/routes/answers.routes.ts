import { Router } from "express";
import {
  listAnswersController,
  createAnswerController,
  editAnswerController,
  deleteAnswerController,
} from "../controllers/answer.controllers";
import ensureAuthMiddleware from "../middlewares/ensure.authorization.middleware";

export const answersRoutes = Router();

answersRoutes.get("", ensureAuthMiddleware, listAnswersController);
answersRoutes.post("", ensureAuthMiddleware, createAnswerController);
answersRoutes.patch("/:id", ensureAuthMiddleware, editAnswerController);
answersRoutes.delete("/:id", ensureAuthMiddleware, deleteAnswerController);
