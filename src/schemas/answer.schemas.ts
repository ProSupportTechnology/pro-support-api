import * as yup from "yup";
import { SchemaOf } from "yup";
import { iAnswerResponse, iAnswerRequest } from "../interfaces/answers.interfaces";
import { questionReturnSchema } from "./question.schemas";
import { userWithoutPasswordSchema } from "./user.schemas";

export const answareResponseSchema: SchemaOf<iAnswerResponse> = yup.object().shape({
  id: yup.string(),
  description: yup.string(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
  user: userWithoutPasswordSchema,
  question: questionReturnSchema,
});

export const listAnswareResponseSchema: SchemaOf<iAnswerResponse[]> = yup.array(answareResponseSchema);

export const bodyAnswerSchema: SchemaOf<iAnswerRequest> = yup.object().shape({
  description: yup.string().required(),
  questionId: yup.string().required(),
  userId: yup.string().required(),
});
