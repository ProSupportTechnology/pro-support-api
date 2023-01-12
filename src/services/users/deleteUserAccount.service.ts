import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { iUserRequest } from "../../interfaces/users.interfaces";

const deleteUserService = async (
  paramsUserId: string
): Promise<iUserRequest> => {
  const userRepository = AppDataSource.getRepository(User);
  const userToDelete = await userRepository.findOneBy({
    id: paramsUserId,
  });

  await userRepository.softRemove(userToDelete);

  const deletedUser = await userRepository.save({
    ...userToDelete,
    isActive: false,
  });

  return deletedUser;
};

export default deleteUserService;
