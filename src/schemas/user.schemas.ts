import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  iUserRequest,
  iUserLogin,
  iUserUpdate,
  iUserResponse,
} from "../interfaces/users.interfaces";

const userRequestSchema: SchemaOf<iUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().notRequired(),
});

const userWithoutPasswordSchema: SchemaOf<iUserResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  isAdm: yup.boolean().notRequired(),
  isActive: yup.boolean().notRequired(),
  bio: yup.string().notRequired(),
  image: yup.string().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
});

const userLoginSchema: SchemaOf<iUserLogin> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const userUpdateSchema: SchemaOf<iUserUpdate> = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
  bio: yup.string().notRequired(),
  image: yup.string().notRequired(),
});

const listAllUsersSchema: SchemaOf<iUserResponse[]> = yup.array(
  userWithoutPasswordSchema
);

export {
  userRequestSchema,
  userWithoutPasswordSchema,
  userLoginSchema,
  userUpdateSchema,
  listAllUsersSchema,
};
