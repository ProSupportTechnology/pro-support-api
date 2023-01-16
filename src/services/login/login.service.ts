import jwt from "jsonwebtoken";
import { compare, hashSync } from "bcryptjs";
import "dotenv/config";
import { iUserLogin } from "../../interfaces/users.interfaces";
import { AppError } from "../../errors";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";

export const loginService = async ({
  email,
  password,
}: iUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("User or password is invalid", 403);
  }

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

  return token;
};
