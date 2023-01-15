import {
  iUser,
  iUserLogin,
  iUserRequest,
  iUserResponse,
} from "../../interfaces/users.interfaces";

const mockedUserRequest: iUserRequest = {
  name: "gaspar",
  email: "gasparzinho@ghost.com",
  password: "ghostbuster4ever",
  isAdm: false,
};

const mockedUserAdmRequest: iUserRequest = {
  name: "adm",
  email: "adm@adm.com",
  password: "ghostbuster4ever",
  isAdm: true,
};

const mockedUserLogin: iUserLogin = {
  email: "gasparzinho@ghost.com",
  password: "ghostbuster4ever",
};

const mockedAdmLogin: iUserLogin = {
  email: "adm@adm.com",
  password: "ghostbuster4ever",
};

const mockedUserSuccessResponse: Omit<
  iUserResponse,
  "id" | "image" | "createdAt" | "updatedAt"
> = {
  email: "gasparzinho@ghost.com",
  bio: "Muahaha Ghost are real",
  name: "gaspar",
  isAdm: true,
};

const mockedUserResponse: Omit<iUserRequest, "password"> = {
  name: "gasparzinho",
  email: "gasparzinho@ghost.com",
};

const mockedUserInvalidBodyRequest: Omit<iUserRequest, "password" | "email"> = {
  name: "gasparzinho",
};

const mockedUserInvalidBodyResponse = {
  error: ["email is a required field", "password is a required field"],
};

const mockedUserUniqueEmailResponse = {
  message: "User already exists",
};

export {
  mockedUserRequest,
  mockedUserResponse,
  mockedUserSuccessResponse,
  mockedUserInvalidBodyRequest,
  mockedUserInvalidBodyResponse,
  mockedUserUniqueEmailResponse,
  mockedUserAdmRequest,
  mockedAdmLogin,
  mockedUserLogin,
};
