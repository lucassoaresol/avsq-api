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
  dash,
}: IUserRequest) => {
  let user = await prisma.user.findUnique({
    where: { login },
  });

  switch (role) {
  case 'ADMIN':
    dash = 'ADMIN';
    break;
  case 'SECRET':
    dash = 'ORGAN';
    break;
  case 'DIRET':
    dash = 'SCHOOL';
    break;
  }

  if (user) throw new AppError('user already exists', 409);

  password = hashSync(password, 10);

  user = await prisma.user.create({
    data: {
      login,
      name,
      password,
      cpf,
      role,
      dash,
    },
  });

  return UserReturnSchema.parse(user);
};
