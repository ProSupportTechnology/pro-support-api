import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

export const deleteUserService = async (
  paramsUserId: string
): Promise<Object> => {
  const userRepository = AppDataSource.getRepository(User);
  const userToDelete = await userRepository
    .findOneByOrFail({
      id: paramsUserId,
    })
    .catch(() => {
      throw new AppError("User not found", 404);
    });

  await userRepository.softRemove(userToDelete);

  return {};
};
