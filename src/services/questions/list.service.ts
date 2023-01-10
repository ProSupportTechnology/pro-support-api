import { AppDataSource } from "../../data-source";
import { Question } from "../../entities/question.entity";

export const listQuestionsService = async () => {
  const questions = await AppDataSource.getRepository(Question).find();
  return questions;
};
