import { Router } from "express";

export const usersRoutes = Router();

//Controllers:
import {
  deleteUserAccountController,
  listUsersController,
  registerUserController,
  retrieveUserProfileController,
  updateUserProfileController,
} from "../controllers/user.controllers";

//Middlewares:

//Serializers:

//Register route:
usersRoutes.post("", registerUserController);

//User profile:
usersRoutes.get("/:id", retrieveUserProfileController);

//List users:
usersRoutes.get("", listUsersController);

//Update user account:
usersRoutes.patch("/:id", updateUserProfileController);

//Delete user account:
usersRoutes.delete("/:id", deleteUserAccountController);
