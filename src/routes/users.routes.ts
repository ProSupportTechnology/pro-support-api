import { Router } from "express";

export const usersRoutes = Router();

import {
  deleteUserAccountController,
  listUsersController,
  registerUserController,
  retrieveUserProfileController,
  updateUserProfileController,
} from "../controllers/user.controllers";
import { User } from "../entities/user.entity";
import ensureAuthMiddleware from "../middlewares/ensure.authorization.middleware";
import { ensureInputIsUuidMiddleware } from "../middlewares/ensureInputIsUuid.middleware";

usersRoutes.post("", registerUserController);

usersRoutes.get("/:id", retrieveUserProfileController);

usersRoutes.get("", listUsersController);

usersRoutes.patch("/:id", ensureAuthMiddleware, updateUserProfileController);

usersRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureInputIsUuidMiddleware(User),
  deleteUserAccountController
);
