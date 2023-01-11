import { AppDataSource } from "../../data-source";
import { Question } from "../../entities/question.entity";
import Jwt from "jsonwebtoken";
import {
  iQuestionRequest,
  iQuestionResponse,
} from "../../interfaces/questions.interfaces";

export const createQuestionService = async (
  body: iQuestionRequest,
  token: string
): Promise<iQuestionResponse> => {
  const questionRepo = AppDataSource.getRepository(Question);

  let tokenUser = token.split(" ")[1];

  // let idUser = "idTest";

  // Jwt.verify(tokenUser, process.env.SECRET_KEY, (error, decoded: any) => {
  //   idUser += decoded.id;
  // });

  const question = questionRepo.create(body);

  await questionRepo.save(question);

  const response = {
    ...question,
    // userId: idUser,
  };

  return response;
};
