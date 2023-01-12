import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const deleteUserService = async (paramsUserId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const userToDelete = await userRepository.findOneBy({
    id: paramsUserId,
  });

  console.log(userToDelete);

  if (!userToDelete) {
    throw new AppError("User not found", 404);
  }

  await userRepository.softRemove(userToDelete);

  return {};
};

export default deleteUserService;
