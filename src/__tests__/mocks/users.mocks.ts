import { iUserRequest, iUserResponse } from "../../interfaces/users.interfaces";

export const mockedUserSuccessResponse: Omit<
  iUserResponse,
  "id" | "image" | "createdAt" | "updatedAt"
> = {
  email: "gasparzinho@ghost.com",
  bio: "Muahaha Ghost are real",
  name: "gaspar",
  isAdm: true,
};

export const mockedUserResponse: Omit<iUserRequest, "password"> = {
  name: "gasparzinho",
  email: "gasparzinho@ghost.com",
};

export const mockedUserInvalidBodyRequest: Omit<
  iUserRequest,
  "password" | "email"
> = {
  name: "gasparzinho",
};

export const mockedUserInvalidBodyResponse = {
  error: ["email is a required field", "password is a required field"],
};

export const mockedUserUniqueEmailResponse = {
  message: "User already exists",
};
