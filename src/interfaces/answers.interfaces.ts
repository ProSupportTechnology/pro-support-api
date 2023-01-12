import { iQuestionResponse } from "./questions.interfaces";
import { iUserResponse } from "./users.interfaces";

export interface iAnswerRequest {
  description: string;
  questionId: string;
  userId: string;
}

export interface iAnswerResponse {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user: iUserResponse;
  question: iQuestionResponse;
}
