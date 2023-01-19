import { AppDataSource } from "../../data-source";
import { Question } from "../../entities/question.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { iQuestionResponse } from "../../interfaces/questions.interfaces";
import { questionByUserReturnSchema } from "../../schemas/question.schemas";

export const listQuestionsByUserService = async (userId: string) => {
  await AppDataSource.getRepository(User)
    .findOneByOrFail({ id: userId })
    .catch(() => {
      throw new AppError("User not found", 404);
    });

  const questions = await AppDataSource.getRepository(Question)
    .createQueryBuilder("questions")
    .leftJoinAndSelect("questions.user", "user")
    .leftJoinAndSelect("questions.answer", "answer")
    .leftJoinAndSelect("answer.user", "answerUser")
    .where("user.id = :userId", { userId })
    .getMany();

  const questionsValidated = await questionByUserReturnSchema.validate(questions, { stripUnknown: true });
  return questionsValidated;
};
