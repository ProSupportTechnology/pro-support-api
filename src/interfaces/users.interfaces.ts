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

export interface iUserUpdateReturn {
  email: string;
  id: string;
  name: string;
  bio: string;
  image: string;
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

export interface iUserLogin {
  email: string;
  password: string;
}

export interface iUser {
  id: string;
  name: string;
  email: string;
  isAdm?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
