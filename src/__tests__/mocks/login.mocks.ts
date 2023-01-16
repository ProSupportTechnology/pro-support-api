import { iUserLogin, iUserRequest } from "../../interfaces/users.interfaces";

const mockedAdmin: iUserRequest = {
  name: "Gaspar admin",
  email: "ghostBombado@ghost.com",
  isAdm: true,
  password: "ghost4ever",
};

const mockedUserLogin: iUserLogin = {
  email: "joana@mail.com",
  password: "123456",
};

const mockedAdminLogin: iUserLogin = {
  email: "ghostBombado@ghost.com",
  password: "ghost4ever",
};

const mockedUser: iUserRequest = {
  name: "Gasper",
  email: "Gasperboy@mail.com",
  isAdm: false,
  password: "ghostnever",
};

export { mockedAdmin, mockedAdminLogin, mockedUserLogin, mockedUser };
