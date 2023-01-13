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

export const registerUserController = async (req: Request, res: Response) => {
  const userData: iUserRequest = req.body;
  const newUser = await registerUserService(userData);
  return res.status(201).json(newUser);
};

export const retrieveUserProfileController = async (
  req: Request,
  res: Response
) => {
  const userId = req.params.id;
  const userProfile = await retrieveUserProfileService(userId);
  return res.json(userProfile);
};

export const listUsersController = async (req: Request, res: Response) => {
  const allUsers = await listUsersService();
  return res.json(allUsers);
};

export const updateUserProfileController = async (
  req: Request,
  res: Response
) => {
  const userData: iUserUpdate = req.body;
  const updatedUser = await updateUserService(req.params.id, userData);
  return res.json(updatedUser);
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
  req: Request,
  res: Response
) => {
  const response = await deleteUserAccountService(req.params.id);
  return res.status(204).json(response);
};
