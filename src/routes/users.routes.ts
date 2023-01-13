import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { ensureAuthMiddleware } from "../middlewares/ensure.authorization.middleware";
import { ensureDataValidationMiddleware } from "../middlewares/ensureDataValidation.middleware";
import { ensureInputIsUuidMiddleware } from "../middlewares/ensureInputIsUuid.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { ensureUserIsAdmin } from "../middlewares/ensureUserIsAdm.middleware";
import { ensureValidRequestInputMiddleware } from "../middlewares/ensureValidRequestInput.middleware";
import { upload } from "../middlewares/upload.middleware";
import { userRequestSchema, userUpdateSchema } from "../schemas/user.schemas";
cloudinary.config({
  cloud_name: "dx231szfy",
  api_key: "118635232295459",
  api_secret: "WO3fSBOBB1w6tXEdInyiJSf9OsM",
  secure: true,
});
import {
  deleteUserAccountController,
  getUploadImageController,
  listUsersController,
  registerUserController,
  retrieveUserProfileController,
  updateUserController,
  uploadImageUserController,
} from "../controllers/user.controllers";

export const usersRoutes = Router();
usersRoutes.post(
  "",
  ensureDataValidationMiddleware(userRequestSchema),
  registerUserController
);

usersRoutes.get(
  "/:id",
  ensureInputIsUuidMiddleware,
  ensureAuthMiddleware,
  ensureUserExistsMiddleware,
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
  ensureInputIsUuidMiddleware,
  ensureAuthMiddleware,
  ensureDataValidationMiddleware(userUpdateSchema),
  ensureValidRequestInputMiddleware,
  updateUserController
);

usersRoutes.post(
  "/upload/:id",
  upload.single("image"),
  uploadImageUserController
);

usersRoutes.get("/upload/:id/:public_id", getUploadImageController);

usersRoutes.delete(
  "/:id",
  ensureInputIsUuidMiddleware,
  ensureUserExistsMiddleware,
  ensureAuthMiddleware,
  deleteUserAccountController
);
