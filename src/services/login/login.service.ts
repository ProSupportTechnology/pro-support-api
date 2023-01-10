import jwt from "jsonwebtoken";
import { compare, hashSync } from "bcryptjs";
import "dotenv/config";
import { IUserLogin } from "../../interfaces/users.interfaces";
import { AppError } from "../../errors";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";

const loginService = async ({ email, password }: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  console.log(hashSync(password, 10));

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("User or password is not valid", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Password Incorrect", 403);
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

export default loginService;
