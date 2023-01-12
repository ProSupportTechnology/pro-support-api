import { AppDataSource } from "../../data-source";
import { Answer } from "../../entities/answer.entity";
import { iAnswerResponse } from "../../interfaces/answers.interfaces";
import { listAnswareResponseSchema } from "../../schemas/answer.schemas";

export const listAnswersService = async (): Promise<iAnswerResponse[]> => {
  const answer = await AppDataSource.getRepository(Answer).find({
    relations: { user: true, question: true },
  });

  const answerValidated = listAnswareResponseSchema.validate(answer, { stripUnknown: true });
  return answerValidated;
};
