import { AppDataSource } from "../../data-source";
import { Question } from "../../entities/question.entity";
import { iQuestionRequest } from "../../interfaces/questions.interfaces";

export const editQuestionService = async (
  body: iQuestionRequest,
  id: string
): Promise<any> => {
  const questionRepo = AppDataSource.getRepository(Question);

  const question = await questionRepo.findOneBy({ id: id });

  //   if(!question) {

  //   }

  console.log(question);

  console.log(body, "Teste Teste", id);

  return "question";
};
