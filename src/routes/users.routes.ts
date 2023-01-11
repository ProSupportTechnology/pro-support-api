import { Router } from "express";

export const usersRoutes = Router();

import {
  deleteUserAccountController,
  listUsersController,
  registerUserController,
  retrieveUserProfileController,
  updateUserProfileController,
} from "../controllers/user.controllers";
import ensureAuthMiddleware from "../middlewares/ensure.authorization.middleware";

usersRoutes.post("", registerUserController);

usersRoutes.get("/:id", retrieveUserProfileController);

usersRoutes.get("", listUsersController);

usersRoutes.patch("/:id", ensureAuthMiddleware, updateUserProfileController);

usersRoutes.delete("/:id", deleteUserAccountController);
