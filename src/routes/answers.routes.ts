import { Router } from "express";
import { createAnswerController } from "../controllers/answer.controllers";

export const answersRoutes = Router();

answersRoutes.post("", createAnswerController);
