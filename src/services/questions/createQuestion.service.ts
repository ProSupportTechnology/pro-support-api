import { AppDataSource } from "../../data-source";
import { Question } from "../../entities/question.entity";
import Jwt from "jsonwebtoken";
import {
  iQuestionRequest,
  iQuestionResponse,
} from "../../interfaces/questions.interfaces";
import { questionReturnSchema } from "../../schemas/question.schemas";
import { User } from "../../entities/user.entity";

export const createQuestionService = async (
  body: iQuestionRequest,
  token: string
): Promise<iQuestionResponse> => {
  const questionRepo = AppDataSource.getRepository(Question);
  const userRepo = AppDataSource.getRepository(User);

  let tokenUser = token.split(" ")[1];

  let idUser = "";

  Jwt.verify(tokenUser, process.env.SECRET_KEY, (error, decoded: any) => {
    idUser += decoded.sub;
  });

  const user = await userRepo.findOneBy({ id: idUser });

  const question = questionRepo.create(body);

  await questionRepo.save(question);

  const bodyResponse = {
    ...question,
    user: user,
  };

  const questionReturn = await questionReturnSchema.validate(bodyResponse, {
    stripUnknown: true,
  });

  return questionReturn;
};
