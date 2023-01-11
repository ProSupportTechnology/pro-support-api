import { Request, Response } from "express";

import { iUserRequest, iUserUpdate } from "../interfaces/users.interfaces";

import registerUserService from "../services/users/registerUser.service";
import retrieveUserProfileService from "../services/users/retrieveUserProfile.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserAccountService from "../services/users/deleteUserAccount.service";

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
  const userProfile = await retrieveUserProfileService();
  return response.status(200).json(userProfile);
};

export const listUsersController = async (
  request: Request,
  response: Response
) => {
  const allUsers = await listUsersService();
  return response.status(200).json(allUsers);
};

export const updateUserProfileController = async (
  request: Request,
  response: Response
) => {
  const userData: iUserUpdate = request.body;
  const updatedUser = await updateUserService(request.params.id, userData);
  return response.status(200).json(updatedUser);
};

export const deleteUserAccountController = async (
  request: Request,
  response: Response
) => {
  await deleteUserAccountService(request.params.id);
  return response.status(204).json({});
};
