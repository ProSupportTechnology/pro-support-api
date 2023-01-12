import { AppDataSource } from "../../data-source";
import { Answer } from "../../entities/answer.entity";
import { AppError } from "../../errors";

export const deleteAnswerService = async (
  answerId: string
): Promise<Object> => {
  const answerRepo = AppDataSource.getRepository(Answer);
  const answer = await answerRepo
    .findOneByOrFail({ id: answerId })
    .catch(() => {
      throw new AppError("Answer not found", 404);
    });

  await answerRepo.softRemove(answer);
  return {};
};
