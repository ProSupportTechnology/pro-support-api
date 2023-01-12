import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  iQuestionRequest,
  iQuestionResponse,
} from "../interfaces/questions.interfaces";

export const questionSchema: SchemaOf<iQuestionRequest> = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().email().required(),
  tech: yup.string().required(),
});

export const questionReturnSchema: SchemaOf<any> = yup.object().shape({
  user: yup.string(),
  updatedAt: yup.date().nullable(),
  createdAt: yup.date().nullable(),
  deletedAt: yup.date().nullable(),
  tech: yup.string(),
  title: yup.string(),
  id: yup.string(),
});
