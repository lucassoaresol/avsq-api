import axiosInstance from '../../axios';
import 'dotenv/config';
import { IPostQuery, IPostsBlogReturn } from '../../interfaces';
import { postBlogArrayReturn } from '../../scripts';

export const listPostsBlogService = async ({ pageToken }: IPostQuery) => {
  let url = `/posts?key=${process.env.BLOGKEY}&fields=nextPageToken,items(id,published,updated,title,content,author(id,displayName),labels)`;

  if (pageToken) url += `&pageToken=${pageToken}`;

  const { data } = await axiosInstance.get<IPostsBlogReturn>(url);

  const result = await postBlogArrayReturn(data);

  return { nextPageToken: data.nextPageToken, result };
};
