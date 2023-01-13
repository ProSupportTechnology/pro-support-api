import { Request, Response } from "express";

import { iUserRequest, iUserUpdate } from "../interfaces/users.interfaces";

import registerUserService from "../services/users/registerUser.service";
import retrieveUserProfileService from "../services/users/retrieveUserProfile.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserAccountService from "../services/users/deleteUserAccount.service";

export const registerUserController = async (req: Request, res: Response) => {
  const userData: iUserRequest = req.body;
  const newUser = await registerUserService(userData);
  return res.status(201).json(newUser);
};

export const retrieveUserProfileController = async (
  req: Request,
  res: Response
) => {
  const userProfile = await retrieveUserProfileService();
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
  const updatedUser = await updateUserService(
    req.user.id,
    req.params.id,
    userData
  );
  return res.json(updatedUser);
};

export const deleteUserAccountController = async (
  req: Request,
  res: Response
) => {
  const response = await deleteUserAccountService(req.params.id);
  return res.status(204).json(response);
};
