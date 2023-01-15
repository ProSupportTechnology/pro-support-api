import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { iUserResponse } from "../../interfaces/users.interfaces";
import { userWithoutPasswordSchema } from "../../schemas/user.schemas";

export const retrieveUserProfileService = async (
  paramsUserId: string
): Promise<iUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const userProfile = await userRepository.findOneBy({ id: paramsUserId });

  const userWithoutPassword = await userWithoutPasswordSchema.validate(
    userProfile,
    {
      stripUnknown: true,
    }
  );

  return userWithoutPassword;
};
