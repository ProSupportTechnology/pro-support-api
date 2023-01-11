import { AppDataSource } from "../../data-source";
import { Answer } from "../../entities/answer.entity";
import { AppError } from "../../errors";
import { iAnswerRequest, iAnswerResponse } from "../../interfaces/answers.interfaces";
import { answareResponseSchema } from "../../schemas/answer.schemas";

export const editAnswerService = async (body: iAnswerRequest, answerId: string) => {
  const answerRepo = AppDataSource.getRepository(Answer);

  let answer = await answerRepo.findOneByOrFail({ id: answerId }).catch(() => {
    throw new AppError("Answer not found", 404);
  });

  answer = answerRepo.create({ ...answer, ...body });
  await answerRepo.save(answer);

  const answerVlidated = await answareResponseSchema.validate(answer, { stripUnknown: true });
  return answerVlidated;
};
