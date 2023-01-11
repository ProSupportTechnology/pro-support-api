import { Question } from "../entities/question.entity";
import { User } from "../entities/user.entity";

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
  user: User;
  question: Question;
}
