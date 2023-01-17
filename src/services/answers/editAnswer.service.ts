import { AppDataSource } from "../../data-source";
import { Answer } from "../../entities/answer.entity";
import { Question } from "../../entities/question.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { iAnswerRequest, iAnswerResponse } from "../../interfaces/answers.interfaces";
import { answareResponseSchema } from "../../schemas/answer.schemas";

export const editAnswerService = async (body: iAnswerRequest, answerId: string): Promise<iAnswerResponse> => {
  const answerRepo = AppDataSource.getRepository(Answer);

  await AppDataSource.getRepository(User)
    .findOneByOrFail({ id: body.userId })
    .catch(() => {
      throw new AppError("User not found", 404);
    });

  await AppDataSource.getRepository(Question)
    .findOneByOrFail({ id: body.questionId })
    .catch(() => {
      throw new AppError("Question not found", 404);
    });

  let answer = await answerRepo.findOneByOrFail({ id: answerId }).catch(() => {
    throw new AppError("Answer not found", 404);
  });

  answer = answerRepo.create({ ...answer, ...body });
  await answerRepo.save(answer);

  const answerVlidated = await answareResponseSchema.validate(answer, { stripUnknown: true });
  return answerVlidated;
};
