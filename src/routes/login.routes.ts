import { Router } from "express";
import { loginController } from "../controllers/login.controllers";

export const loginRoutes = Router();

loginRoutes.post("", loginController);
