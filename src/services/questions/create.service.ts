import { iQuestionRequest } from "../../interfaces/questions.interfaces";

export const createQuestionService = async (
  body: iQuestionRequest
): Promise<any> => {
  const test = {
    ...body,
  };

  return test;
};
