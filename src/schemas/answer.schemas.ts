import * as yup from "yup";
import { SchemaOf } from "yup";
import { iAnswerRequest } from "../interfaces/answers.interfaces";

export const bodyAnswerSchema: SchemaOf<iAnswerRequest> = yup.object().shape({
  description: yup.string().required(),
  questionId: yup.string().required(),
  userId: yup.string().required(),
});
