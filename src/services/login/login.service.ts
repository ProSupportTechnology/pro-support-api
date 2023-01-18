import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import "dotenv/config";
import { iUserLogin, iUserLoginResponse } from "../../interfaces/users.interfaces";
import { AppError } from "../../errors";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { userWithoutPasswordSchema } from "../../schemas/user.schemas";

export const loginService = async ({ email, password }: iUserLogin): Promise<iUserLoginResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository
    .findOneByOrFail({
      email: email,
    })
    .catch(() => {
      throw new AppError("User or password is invalid", 403);
    });

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("User or password is invalid", 403);
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY!,
    {
      subject: String(user.id),
      expiresIn: "24h",
    }
  );

  const userWithoutPassword = await userWithoutPasswordSchema.validate(user, { stripUnknown: true });

  return { token, user: userWithoutPassword };
};
