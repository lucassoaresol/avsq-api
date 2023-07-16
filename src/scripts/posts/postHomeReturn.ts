import prisma from '../../prisma';

export const postHomeReturn = async (card: {
  id: string;
  name: string;
  tag: string;
  post_id: string;
}) => {
  const { post_id } = card;

  const id = post_id;

  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      published: true,
      user: { select: { id: true, name: true } },
    },
  });

  const cover = await prisma.imageData.findFirst({
    where: { image: { posts: { some: { post_id, is_cover: true } } } },
    select: { id: true, url: true },
  });

  return { ...card, post: { ...post, cover } };
};

export const postHomeArrayReturn = async (
  cards: {
    id: string;
    name: string;
    tag: string;
    post_id: string;
  }[],
) => {
  const posts = cards.map((el) => postHomeReturn(el));

  return Promise.all(posts).then((post) => {
    return post;
  });
};
