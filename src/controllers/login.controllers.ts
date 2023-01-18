import { Request, Response } from "express";
import { iUserLogin } from "../interfaces/users.interfaces";
import { loginService } from "../services/login/login.service";

export const loginController = async (req: Request, res: Response) => {
  const loginInformation: iUserLogin = req.body;
  const data = await loginService(loginInformation);
  return res.json(data);
};
