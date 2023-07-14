import { AppError } from '../../errors';
import prisma from '../../prisma';

export const retrieveUserWithCpfService = async (login: string) => {
  const user = await prisma.user.findUnique({
    where: { login },
    select: { name: true, role: true },
  });

  if (!user) throw new AppError('user not found', 404);

  return user;
};
