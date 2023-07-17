import { postReturn } from '../../scripts';

export const retrievePostService = async (id: string) => {
  const post = await postReturn(id);
  return post;
};
