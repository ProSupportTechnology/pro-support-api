import {
  iUserLogin,
  iUserRequest,
  iUserResponse,
} from "../../interfaces/users.interfaces";

export const mockedUserRequest: iUserRequest = {
  name: "gaspar",
  email: "gasparzinho@ghost.com",
  password: "ghostbuster4ever",
  isAdm: false,
};

export const mockedUserAdmRequest: iUserRequest = {
  name: "adm",
  email: "adm@adm.com",
  password: "ghostbuster4ever",
  isAdm: true,
};

export const mockedUserLogin: iUserLogin = {
  email: "gasparzinho@ghost.com",
  password: "ghostbuster4ever",
};

export const mockedAdmLogin: iUserLogin = {
  email: "adm@adm.com",
  password: "ghostbuster4ever",
};

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
