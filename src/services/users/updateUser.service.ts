import { AppDataSource } from "../../data-source";
import { iUserUpdate } from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { userUpdateReturnSchema } from "../../schemas/user.schemas";

export const updateUserService = async (
  paramsUserId: string,
  userData: iUserUpdate
): Promise<iUserUpdate> => {
  const userRepository = AppDataSource.getRepository(User);
  const userToUpdate = await userRepository
    .findOneByOrFail({
      id: paramsUserId,
    })
    .catch(() => {
      throw new AppError("User not found", 404);
    });

  const updatedUser = userRepository.create({
    ...userToUpdate,
    ...userData,
  });

  await userRepository.save(updatedUser);

  const userUpdatedReturn = await userUpdateReturnSchema.validate(updatedUser, {
    stripUnknown: true,
  });

  return userUpdatedReturn;
};
