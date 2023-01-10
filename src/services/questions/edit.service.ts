import { AppDataSource } from "../../data-source";
import { Question } from "../../entities/question.entity";
import { AppError } from "../../errors";
import { iQuestionRequest } from "../../interfaces/questions.interfaces";
import { questionSchema } from "../../schemas/question.schemas";

export const editQuestionService = async (
  body: iQuestionRequest,
  id: string
): Promise<any> => {
  const questionRepo = AppDataSource.getRepository(Question);

  try {
    const question = await questionRepo.findOneBy({ id: id });

    const updatedQuestion = questionRepo.create({
      ...question,
      ...body,
    });

    await questionRepo.save(updatedQuestion);

    return updatedQuestion;
  } catch (error) {
    throw new AppError("This id is not in the database", 404);
  }
};
