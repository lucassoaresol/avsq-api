import prisma from '../../prisma';

export const verifyUser = async (author: {
  id: string;
  displayName: string;
}) => {
  const { id: blog_id, displayName: name } = author;

  let user = await prisma.user.findUnique({
    where: { blog_id },
    select: {
      id: true,
      name: true,
      profile: { select: { id: true, url: true } },
    },
  });

  if (!user)
    user = await prisma.user.create({
      data: { login: blog_id, name, blog_id },
      select: {
        id: true,
        name: true,
        profile: { select: { id: true, url: true } },
      },
    });

  return user;
};
