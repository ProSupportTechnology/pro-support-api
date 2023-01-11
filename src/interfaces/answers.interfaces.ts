import { Question } from "../entities/question.entity";
import { iUserResponse } from "./users.interfaces";

export interface iAnswerRequest {
  description: string;
  questionId: string;
  userId: string;
}

export interface iAnswerResponse {
  id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: iUserResponse;
  question: Question;
}
