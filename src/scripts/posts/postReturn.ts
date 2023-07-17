import prisma from '../../prisma';

export const postReturn = async (id: string) => {
  const post_id = id;

  const post = await prisma.post.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true } } },
  });

  const cover = await prisma.imageData.findFirst({
    where: { image: { posts: { some: { post_id, is_cover: true } } } },
    select: { id: true, url: true },
  });

  return { ...post, cover };
};

export const postArrayReturn = async (
  postsData: {
    id: string;
  }[],
) => {
  const posts = postsData.map((el) => postReturn(el.id));

  return Promise.all(posts).then((post) => {
    return post;
  });
};
