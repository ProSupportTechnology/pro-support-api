import { AppDataSource } from "../../data-source";
import { iUserResponse, iUserUpdate } from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";

const updateUserService = async (
  loggedUserId: string,
  paramsUserId: string,
  userData: iUserUpdate
): Promise<iUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const userToUpdate = userRepository.findOneBy({});

  return userToUpdate;
};

export default updateUserService;
