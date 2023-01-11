import { AppDataSource } from "../../data-source";
import { Answer } from "../../entities/answer.entity";
import { Question } from "../../entities/question.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import {
  iAnswerCreateResponse,
  iAnswerRequest,
} from "../../interfaces/answers.interfaces";
import {
  bodyAnswerSchema,
  createAnswerResponseSchema,
} from "../../schemas/answer.schemas";

export const createAnswerService = async (
  answerBody: iAnswerRequest
): Promise<iAnswerCreateResponse> => {
  const userId = answerBody.userId;
  const questionId = answerBody.questionId;

  const answersRepository = AppDataSource.getRepository(Answer);
  const usersRepository = AppDataSource.getRepository(User);
  const questionsRepository = AppDataSource.getRepository(Question);

  const question = await questionsRepository
    .findOneByOrFail({ id: questionId })
    .catch(() => {
      throw new AppError("Question not found", 404);
    });

  const user = await usersRepository
    .findOneByOrFail({ id: userId })
    .catch(() => {
      throw new AppError("User not found", 404);
    });

  const answerValidated = await bodyAnswerSchema.validate(answerBody, {
    stripUnknown: true,
  });

  const answer = answersRepository.create({
    ...answerValidated,
    user,
    question,
  });

  await answersRepository.save(answer);

  const validatedResponse = await createAnswerResponseSchema.validate(
    { ...answer, userId, questionId },
    {
      stripUnknown: true,
    }
  );

  return validatedResponse;
};
