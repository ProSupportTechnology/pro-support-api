import { AppDataSource } from "../../data-source";
import { Question } from "../../entities/question.entity";
import { AppError } from "../../errors";
import {
  iQuestionRequest,
  iQuestionResponse,
} from "../../interfaces/questions.interfaces";

export const editQuestionService = async (
  body: iQuestionRequest,
  id: string
): Promise<iQuestionResponse> => {
  const questionRepo = AppDataSource.getRepository(Question);

  const question = await questionRepo.findOneByOrFail({ id: id }).catch(() => {
    throw new AppError("Question not found", 404);
  });

  const updatedQuestion = questionRepo.create({
    ...question,
    ...body,
  });

  await questionRepo.save(updatedQuestion);

  return updatedQuestion;
};
