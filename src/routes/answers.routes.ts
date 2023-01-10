import { Router } from "express";
import { listAnswersController, createAnswerController } from "../controllers/answer.controllers";

export const answersRoutes = Router();

answersRoutes.get("", listAnswersController);
answersRoutes.post("", createAnswerController);
