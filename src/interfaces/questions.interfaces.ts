import { iAnswerResponse } from "./answers.interfaces";
import { iUserResponse } from "./users.interfaces";

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
  user: iUserResponse;
}

export interface iQuestionByUserResponse {
  id: string;
  title: string;
  description: string;
  tech: string;
  createdAt: Date;
  updatedAt: Date;
  user: iUserResponse;
  answer: Omit<iAnswerResponse, "question">[];
}
