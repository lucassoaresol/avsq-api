import { postReturn } from './postReturn';

export const postHomeReturn = async (card: {
  id: string;
  name: string;
  tag: string;
  post_id: string;
}) => {
  return { ...card, post: await postReturn(card.post_id) };
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
