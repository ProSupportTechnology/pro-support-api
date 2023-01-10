import { AppDataSource } from "../../data-source";
import { Question } from "../../entities/question.entity";
import { iQuestionRequest } from "../../interfaces/questions.interfaces";

export const createQuestionService = async (
  body: iQuestionRequest
): Promise<any> => {
  const questionRepo = AppDataSource.getRepository(Question);

  const question = questionRepo.create(body);

  await questionRepo.save(body);

  return question;
};
