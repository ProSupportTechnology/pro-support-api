import * as yup from "yup";
import { SchemaOf } from "yup";
import { iAnswerResponse } from "../interfaces/answers.interfaces";

export const answareResponseSchema: SchemaOf<iAnswerResponse> = yup.object().shape({
  id: yup.string(),
  description: yup.string(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
  user: yup.object(),
  question: yup.object(),
});

export const listAnswareResponseSchema: SchemaOf<iAnswerResponse[]> = yup.array(answareResponseSchema);
