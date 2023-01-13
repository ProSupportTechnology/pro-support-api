import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";

import { iUserRequest, iUserUpdate } from "../interfaces/users.interfaces";

import registerUserService from "../services/users/registerUser.service";
import retrieveUserProfileService from "../services/users/retrieveUserProfile.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserAccountService from "../services/users/deleteUserAccount.service";
import updateImageUserService from "../services/users/uploadImageUser.service";

export const registerUserController = async (
  request: Request,
  response: Response
) => {
  const userData: iUserRequest = request.body;
  const newUser = await registerUserService(userData);
  return response.status(201).json(newUser);
};

export const retrieveUserProfileController = async (
  request: Request,
  response: Response
) => {
  const userProfile = await retrieveUserProfileService(request.params.id);
  return response.status(200).json(userProfile);
};

export const listUsersController = async (
  request: Request,
  response: Response
) => {
  const allUsers = await listUsersService();
  return response.status(200).json(allUsers);
};

export const updateUserController = async (
  request: Request,
  response: Response
) => {
  const userData: iUserUpdate = request.body;
  const updatedUser = await updateUserService(request.params.id, userData);
  return response.status(200).json(updatedUser);
};

export const getUploadImageController = async (
  request: Request,
  response: Response
) => {
  const { public_id } = request.params;
  const image = cloudinary.url(public_id);

  response.json(image);
};

export const uploadImageUserController = async (
  request: Request,
  response: Response
) => {
  const upload = await cloudinary.uploader.upload(
    request.file!.path,
    async (error, result) => {
      const upload = await updateImageUserService(
        result.secure_url,
        request.params.id
      );

      const public_id = {
        public_id: result.public_id,
      };

      const resultado = {
        ...upload,
        ...public_id,
      };
      return response.json(resultado).status(200);
    }
  );

  fs.unlink(request.file!.path, (error) => {
    if (error) {
      console.log(error);
    }
  });
};

export const deleteUserAccountController = async (
  request: Request,
  response: Response
) => {
  await deleteUserAccountService(request.params.id);
  return response.status(204).json({});
};
