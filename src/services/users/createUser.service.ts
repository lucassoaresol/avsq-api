import prisma from '../../prisma';
import { IUserRequest } from '../../interfaces';
import { hashSync } from 'bcryptjs';
import { AppError } from '../../errors';
import { UserReturnSchema } from '../../schemas';

export const createUserService = async ({
  login,
  name,
  password,
  cpf,
  role,
}: IUserRequest) => {
  let user = await prisma.user.findUnique({
    where: { login },
  });

  if (user) throw new AppError('user already exists', 409);

  password = hashSync(password, 10);

  user = await prisma.user.create({
    data: {
      login,
      name,
      password,
      cpf,
      role,
    },
  });

  return UserReturnSchema.parse(user);
};
