import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, iUserRequest } from "../../interfaces/users.interfaces";
import { userWithoutPasswordSchema } from "../../schemas/user.schemas";
import { AppError } from "../../errors";

export const registerUserService = async (
  userData: iUserRequest
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const userAlreadyExists = await userRepository.exist({
    where: { email: userData.email },
    withDeleted: true,
  });

  if (userAlreadyExists) {
    throw new AppError("User already exists", 409);
  }

  const newUser = userRepository.create(userData);

  await userRepository.save(newUser);

  const userWithoutPassword = await userWithoutPasswordSchema.validate(
    newUser,
    {
      stripUnknown: true,
    }
  );

  return userWithoutPassword;
};
