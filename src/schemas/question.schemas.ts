import * as yup from "yup";
import { SchemaOf } from "yup";
import { iQuestionRequest } from "../interfaces/questions.interfaces";

export const questionSchema: SchemaOf<iQuestionRequest> = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().email().required(),
  tech: yup.string().required(),
});
