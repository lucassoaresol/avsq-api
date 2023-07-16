import prisma from '../../prisma';

const verifyTag = async (name: string, post_id: string) => {
  let tag = await prisma.tag.findUnique({ where: { name } });

  if (!tag) tag = await prisma.tag.create({ data: { name } });

  await prisma.post.update({
    where: { id: post_id },
    data: {
      tags: {
        connectOrCreate: {
          create: { tag_id: tag.id },
          where: { post_id_tag_id: { post_id, tag_id: tag.id } },
        },
      },
    },
  });

  return tag;
};

export const verifyTagArray = async (labels: string[], post_id: string) => {
  const tags = labels.map((el) => verifyTag(el, post_id));

  return Promise.all(tags).then((tag) => {
    return tag;
  });
};
