import { Router } from "express";
import {
  createQuestionController,
  editChangedController,
  listQuestionsController,
} from "../controllers/question.controllers";

export const questionsRoutes = Router();

questionsRoutes.post("", createQuestionController);

questionsRoutes.patch("/:id", editChangedController);

questionsRoutes.get("", listQuestionsController);
questionsRoutes.delete("");
