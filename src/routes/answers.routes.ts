import { Router } from "express";
import {
  listAnswersController,
  createAnswerController,
  editAnswerController,
  deleteAnswerController,
} from "../controllers/answer.controllers";

export const answersRoutes = Router();

answersRoutes.get("", listAnswersController);
answersRoutes.post("", createAnswerController);
answersRoutes.patch("/:id", editAnswerController);
answersRoutes.delete("/:id", deleteAnswerController);
