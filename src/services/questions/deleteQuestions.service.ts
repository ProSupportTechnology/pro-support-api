import { AppDataSource } from "../../data-source";
import { Question } from "../../entities/question.entity";
import { AppError } from "../../errors";
import { iQuestionResponse } from "../../interfaces/questions.interfaces";

export const deleteQuestionsService = async (id: string): Promise<number> => {
  const questionsRepository = AppDataSource.getRepository(Question);
  const question = await questionsRepository.findOneBy({ id: id });

  if (!question) {
    throw new AppError("Question doesn't exists", 404);
  }

  await questionsRepository.softRemove(question);
  await questionsRepository.save({ ...question, status: "removed" });

  return 204;
};
