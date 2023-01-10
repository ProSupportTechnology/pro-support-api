import { Router } from "express";
import {
  createQuestionController,
  editChangedController,
} from "../controllers/question.controllers";

export const questionsRoutes = Router();

questionsRoutes.post("", createQuestionController);

questionsRoutes.patch("/:id", editChangedController);
