import { Router } from "express";
import { listQuestionsController } from "../controllers/question.controllers";

export const questionsRoutes = Router();

questionsRoutes.get("", listQuestionsController);
questionsRoutes.delete("");
