import { AppDataSource } from "../../data-source";
import { Question } from "../../entities/question.entity";
import {
  iQuestionRequest,
  iQuestionResponse,
} from "../../interfaces/questions.interfaces";
import { questionReturnSchema } from "../../schemas/question.schemas";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

export const createQuestionService = async (
  body: iQuestionRequest,
  token: string,
  id: string
): Promise<iQuestionResponse> => {
  const questionRepo = AppDataSource.getRepository(Question);
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOneByOrFail({ id: id }).catch(() => {
    throw new AppError("User not found", 404);
  });

  const question = questionRepo.create({ ...body, user });

  await questionRepo.save(question);

  const questionReturn = await questionReturnSchema.validate(question, {
    stripUnknown: true,
  });

  return questionReturn;
};
