import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { iUserResponse } from "../../interfaces/users.interfaces";
import { listAllUsersSchema } from "../../schemas/user.schemas";

const registerUserService = async (): Promise<iUserResponse[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const allUsers = await userRepository.find({
    withDeleted: true,
  });

  const allUsersWithoutPassword = await listAllUsersSchema.validate(allUsers, {
    stripUnknown: true,
  });

  return allUsersWithoutPassword;
};

export default registerUserService;
