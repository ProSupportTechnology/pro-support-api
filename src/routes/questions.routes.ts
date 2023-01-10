import { Router } from "express";
import {
  deleteQuestionsController,
  listQuestionsController,
} from "../controllers/question.controllers";

export const questionsRoutes = Router();

questionsRoutes.get("", listQuestionsController);
questionsRoutes.delete("", deleteQuestionsController);
