import { Router } from "express";
import {
  deleteUserAccountController,
  listUsersController,
  registerUserController,
  retrieveUserProfileController,
  updateUserProfileController,
} from "../controllers/user.controllers";

import ensureAuthMiddleware from "../middlewares/ensure.authorization.middleware";
import { ensureInputIsUuidMiddleware } from "../middlewares/ensureInputIsUuid.middleware";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdm.middleware";

export const usersRoutes = Router();
usersRoutes.post("", registerUserController);

usersRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureInputIsUuidMiddleware(),
  retrieveUserProfileController
);

usersRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureUserIsAdmin,
  listUsersController
);

usersRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureInputIsUuidMiddleware(),
  updateUserProfileController
);

usersRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureInputIsUuidMiddleware(),
  deleteUserAccountController
);
