import { AppDataSource } from "../../data-source";
import { Question } from "../../entities/question.entity";
import Jwt from "jsonwebtoken";
import {
  iQuestionRequest,
  iQuestionResponse,
} from "../../interfaces/questions.interfaces";
import { questionReturnSchema } from "../../schemas/question.schemas";

export const createQuestionService = async (
  body: iQuestionRequest,
  token: string
): Promise<iQuestionResponse> => {
  const questionRepo = AppDataSource.getRepository(Question);

  let tokenUser = token.split(" ")[1];

  let idUser = "";

  Jwt.verify(tokenUser, process.env.SECRET_KEY, (error, decoded: any) => {
    idUser += decoded.sub;
  });

  const question = questionRepo.create(body);

  await questionRepo.save(question);

  const bodyResponse = {
    ...question,
    user: idUser,
  };

  const questionReturn = await questionReturnSchema.validate(bodyResponse, {
    stripUnknown: true,
  });

  return questionReturn;
};
