import { AppDataSource } from "../../data-source";
import { Question } from "../../entities/question.entity";
import { iQuestionResponse } from "../../interfaces/questions.interfaces";

export const listQuestionsService = async (): Promise<iQuestionResponse[]> => {
  const questionsRepository = AppDataSource.getRepository(Question);
  const allQuestions = await questionsRepository.find();

  return allQuestions;
};
