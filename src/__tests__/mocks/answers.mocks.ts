import { iAnswerRequest } from "../../interfaces/answers.interfaces";

export const mockedAnswerRequest: iAnswerRequest = {
  description: "Test description",
  questionId: "",
  userId: "",
};

export const mockedInvalidAnswerRequest = {
  description: { chave: "Test description" },
  questionId: 2,
  userId: 343,
};
