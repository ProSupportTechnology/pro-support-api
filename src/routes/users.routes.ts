import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

import {
  deleteUserAccountController,
  getUploadImageController,
  listUsersController,
  registerUserController,
  retrieveUserProfileController,
  updateUserProfileController,
  uploadImageUserController,
} from "../controllers/user.controllers";

import { upload } from "../middlewares/upload.middleware";

cloudinary.config({
  cloud_name: "dx231szfy",
  api_key: "118635232295459",
  api_secret: "WO3fSBOBB1w6tXEdInyiJSf9OsM",
  secure: true,
});

import ensureAuthMiddleware from "../middlewares/ensure.authorization.middleware";
import { ensureInputIsUuidMiddleware } from "../middlewares/ensureInputIsUuid.middleware";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdm.middleware";

export const usersRoutes = Router();
usersRoutes.post("", registerUserController);

usersRoutes.get("/:id", ensureAuthMiddleware, ensureInputIsUuidMiddleware, retrieveUserProfileController);

usersRoutes.get("", ensureAuthMiddleware, ensureUserIsAdmin, listUsersController);

usersRoutes.patch("/:id", ensureAuthMiddleware, ensureInputIsUuidMiddleware, updateUserProfileController);

usersRoutes.post("/upload/:id", upload.single("image"), uploadImageUserController);

usersRoutes.get("/upload/:id/:public_id", getUploadImageController);
usersRoutes.delete("/:id", ensureAuthMiddleware, ensureInputIsUuidMiddleware, deleteUserAccountController);
