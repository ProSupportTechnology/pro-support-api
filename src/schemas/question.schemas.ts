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

export const questionReturnSchema: SchemaOf<iQuestionResponse> = yup
  .object()
  .shape({
    user: yup.string(),
    updatedAt: yup.date(),
    createdAt: yup.date(),
    deletedAt: yup.date().nullable(),
    tech: yup.string(),
    description: yup.string(),
    title: yup.string(),
    id: yup.string(),
  });
