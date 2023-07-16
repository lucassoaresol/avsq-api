import axiosInstance from '../../axios';
import 'dotenv/config';
import { IPostsBlogReturn } from '../../interfaces';
import { postBlogArrayReturn } from '../../scripts';

export const listPostsHomeService = async () => {
  const url = `/posts?key=${process.env.BLOGKEY}&fields=nextPageToken,items(id,published,updated,title,content,author(id,displayName),labels)`;

  const { data } = await axiosInstance.get<IPostsBlogReturn>(url);

  const result = await postBlogArrayReturn(data);

  return { nextPageToken: data.nextPageToken, result };
};
