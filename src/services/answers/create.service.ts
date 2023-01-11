import { AppDataSource } from "../../data-source";
import { Answer } from "../../entities/answer.entity";
import { Question } from "../../entities/question.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { iAnswerRequest } from "../../interfaces/answers.interfaces";
import { answareResponseSchema } from "../../schemas/answer.schemas";

export const createAnswerService = async (answerBody: iAnswerRequest) => {
  const { userId, questionId } = answerBody;

  const answersRepository = AppDataSource.getRepository(Answer);
  const usersRepository = AppDataSource.getRepository(User);
  const questionsRepository = AppDataSource.getRepository(Question);

  const question = await questionsRepository.findOneByOrFail({ id: questionId }).catch(() => {
    throw new AppError("Question not found", 404);
  });

  const user = await usersRepository.findOneByOrFail({ id: userId }).catch(() => {
    throw new AppError("User not found", 404);
  });

  const answer = answersRepository.create({
    ...answerBody,
    user,
    question,
  });

  await answersRepository.save(answer);

  const validatedResponse = await answareResponseSchema.validate(answer, {
    stripUnknown: true,
  });

  return validatedResponse;
};
