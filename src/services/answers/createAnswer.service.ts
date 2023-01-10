import { AppDataSource } from "../../data-source";
import { Answer } from "../../entities/answer.entity";
import { Question } from "../../entities/question.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { iAnswerRequest } from "../../interfaces/answers.interfaces";
import { bodyAnswerSchema } from "../../schemas/answer.schemas";

export const createAnswerService = async (
  answerBody: iAnswerRequest
): Promise<Answer> => {
  const userId = answerBody.userId;
  const questionId = answerBody.questionId;

  const answersRepository = AppDataSource.getRepository(Answer);
  const usersRepository = AppDataSource.getRepository(User);
  const questionsRepository = AppDataSource.getRepository(Question);

  const questionExists = await questionsRepository.findOneBy({
    id: questionId,
  });

  const user = await usersRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User don't exists", 404);
  }

  if (!questionExists) {
    throw new AppError("Question don't exists!", 404);
  }

  const answerValid = await bodyAnswerSchema.validate(answerBody, {
    stripUnknown: true,
  });

  const answer = answersRepository.create({
    ...answerValid,
    user,
    question: questionExists,
  });

  await answersRepository.save(answer);

  return answer;
};
