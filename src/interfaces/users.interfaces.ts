export interface iUserRequest {
  email: string;
  password: string;
  name: string;
  isAdm?: boolean;
}

export interface iUserResponse {
  id: string;
  email: string;
  name: string;
  bio: string;
  isAdm?: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}
