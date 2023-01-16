import { iUserLogin, iUserRequest } from "../../interfaces/users.interfaces";

export const mockedAdmin: iUserRequest = {
  name: "Gaspar admin",
  email: "ghostBombado@ghost.com",
  isAdm: true,
  password: "ghost4ever",
};

export const mockedUserLogin: iUserLogin = {
  email: "Gasperboy@mail.com",
  password: "ghostnever",
};

export const mockedAdminLogin: iUserLogin = {
  email: "ghostBombado@ghost.com",
  password: "ghost4ever",
};

export const mockedUser: iUserRequest = {
  name: "Gasper",
  email: "Gasperboy@mail.com",
  isAdm: false,
  password: "ghostnever",
};
