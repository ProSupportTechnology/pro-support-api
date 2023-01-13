import { AppDataSource } from "../../data-source";
import { Question } from "../../entities/question.entity";
import { AppError } from "../../errors";

export const deleteQuestionsService = async (id: string): Promise<Object> => {
  const questionsRepository = AppDataSource.getRepository(Question);
  const question = await questionsRepository.findOneBy({ id: id });

  if (!question) {
    throw new AppError("Question doesn't exists", 409);
  }

  await questionsRepository.softRemove(question);

  return {};
};
