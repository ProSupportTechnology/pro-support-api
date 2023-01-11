export interface iUserRequest {
  email: string;
  password: string;
  name: string;
  isAdm?: boolean;
}

export interface iUserUpdate {
  email?: string;
  password?: string;
  name?: string;
  bio?: string;
  image?: string;
}

export interface iUserLogin {
  email: string;
  password: string;
}

export interface iUserResponse {
  id: string;
  email: string;
  name: string;
  bio: string;
  isAdm: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
