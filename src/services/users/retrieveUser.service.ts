import prisma from '../../prisma';
import { UserReturnSchema } from '../../schemas';

export const retrieveUserService = async (id: string) => {
  const userData = await prisma.user.findUnique({
    where: { id },
  });

  return UserReturnSchema.parse(userData);
};
