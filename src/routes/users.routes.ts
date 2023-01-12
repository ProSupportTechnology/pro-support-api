import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
export const usersRoutes = Router();

import {
  deleteUserAccountController,
  getUploadImageController,
  listUsersController,
  registerUserController,
  retrieveUserProfileController,
  updateUserProfileController,
  uploadImageUserController,
} from "../controllers/user.controllers";

import ensureAuthMiddleware from "../middlewares/ensure.authorization.middleware";
import { upload } from "../middlewares/upload.middleware";

cloudinary.config({
  cloud_name: "dx231szfy",
  api_key: "118635232295459",
  api_secret: "WO3fSBOBB1w6tXEdInyiJSf9OsM",
  secure: true,
});

usersRoutes.post("", registerUserController);

usersRoutes.get("/:id", retrieveUserProfileController);

usersRoutes.get("", ensureAuthMiddleware, listUsersController);

usersRoutes.patch("/:id", ensureAuthMiddleware, updateUserProfileController);

usersRoutes.post(
  "/upload/:id",
  upload.single("image"),
  uploadImageUserController
);

usersRoutes.get("/upload/:id/:public_id", getUploadImageController);
usersRoutes.delete("/:id", ensureAuthMiddleware, deleteUserAccountController);
