import prisma from '../../prisma';

export const verifyUser = async (author: {
  id: string;
  displayName: string;
}) => {
  const { id: blog_id, displayName: name } = author;

  let userReturn = {};

  let user = await prisma.user.findUnique({
    where: { blog_id },
    select: {
      id: true,
      name: true,
    },
  });

  if (!user)
    user = await prisma.user.create({
      data: { login: blog_id, name, blog_id },
      select: {
        id: true,
        name: true,
      },
    });

  userReturn = { ...user };

  const profile = await prisma.imageData.findFirst({
    where: { image: { user_id: user.id } },
    select: { id: true, url: true },
  });

  if (profile)
    userReturn = {
      ...userReturn,
      profile,
    };

  return userReturn;
};
