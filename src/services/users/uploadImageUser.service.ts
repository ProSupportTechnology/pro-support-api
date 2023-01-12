import { AppDataSource } from "../../data-source";
import { iUserUpdate } from "../../interfaces/users.interfaces";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { userUpdateReturnSchema } from "../../schemas/user.schemas";

const updateImageUserService = async (
  imageData: any,
  paramsId: any
): Promise<iUserUpdate> => {
  const userRepository = AppDataSource.getRepository(User);
  const userToUpdate = await userRepository.findOneBy({
    id: paramsId,
  });

  const dataImport = {
    image: imageData,
  };

  if (!userToUpdate) {
    throw new AppError("User not found with this id", 404);
  }

  const updatedUser = userRepository.create({
    ...userToUpdate,
    ...dataImport,
  });

  await userRepository.save(updatedUser);

  const userUpdatedReturn = await userUpdateReturnSchema.validate(updatedUser, {
    stripUnknown: true,
  });

  return userUpdatedReturn;
};

export default updateImageUserService;
