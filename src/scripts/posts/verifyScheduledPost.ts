import prisma from '../../prisma';

export const verifyScheduledPost = async () => {
  const currentDateTime = new Date();

  const scheduledPosts = await prisma.post.findMany({
    where: { status: 'SCHEDULED', published: { gte: currentDateTime } },
  });

  for (const post of scheduledPosts) {
    await prisma.post.update({
      where: { id: post.id },
      data: { status: 'PUBLISHED' },
    });
  }
};
