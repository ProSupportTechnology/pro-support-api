import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  iQuestionByUserResponse,
  iQuestionRequest,
  iQuestionResponse,
} from "../interfaces/questions.interfaces";
import { listAnswareResponseSchema } from "./answer.schemas";
import { userWithoutPasswordSchema } from "./user.schemas";

export const questionSchema: SchemaOf<iQuestionRequest> = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  tech: yup.string().required(),
});

export const editQuestionSchema: SchemaOf<iQuestionRequest> = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  tech: yup.string(),
});

export const questionReturnSchema: SchemaOf<iQuestionResponse> = yup.object().shape({
  user: userWithoutPasswordSchema,
  updatedAt: yup.date(),
  createdAt: yup.date(),
  tech: yup.string(),
  description: yup.string(),
  title: yup.string(),
  id: yup.string(),
});

export const questionByUserReturnSchema: SchemaOf<iQuestionByUserResponse[]> = yup.array(
  yup.object().shape({
    id: yup.string(),
    title: yup.string(),
    description: yup.string(),
    tech: yup.string(),
    createdAt: yup.date(),
    updatedAt: yup.date(),
    user: userWithoutPasswordSchema,
    answer: yup.array(
      yup.object().shape({
        id: yup.string(),
        description: yup.string(),
        createdAt: yup.date(),
        updatedAt: yup.date(),
        user: userWithoutPasswordSchema,
      })
    ),
  })
);
