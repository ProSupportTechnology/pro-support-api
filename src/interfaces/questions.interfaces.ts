import { User } from "../entities/user.entity";

export interface iQuestionRequest {
  title: string;
  description: string;
  tech: string;
}

export interface iQuestionResponse {
  id: string;
  title: string;
  description: string;
  tech: string;
  createdAt: Date;
  updatedAt: Date;
  user: User | object;
}
