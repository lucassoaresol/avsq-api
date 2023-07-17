import { IQuery } from '../../interfaces';
import prisma from '../../prisma';
import { postArrayReturn } from '../../scripts';

export const listPostsService = async ({ take, skip }: IQuery) => {
  if (take) take = +take;
  if (skip) skip = +skip;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      take,
      skip,
      orderBy: { published: 'desc' },
      select: { id: true },
    }),
    prisma.post.count(),
  ]);

  return { total, result: await postArrayReturn(posts) };
};
