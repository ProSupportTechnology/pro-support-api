import { Router } from "express";
import { listAnswersController } from "../controllers/answer.controllers";

export const answersRoutes = Router();

answersRoutes.get("", listAnswersController);
