import { Router } from "express";
import {
  listAnswersController,
  createAnswerController,
  editAnswerController,
} from "../controllers/answer.controllers";

export const answersRoutes = Router();

answersRoutes.get("", listAnswersController);
answersRoutes.post("", createAnswerController);
answersRoutes.patch("/:id", editAnswerController);
