import { JSDOM } from 'jsdom';
import axiosInstance from '../../axios';
import 'dotenv/config';

interface IPostsReturn {
  items: {
    id: string;
    published: string;
    title: string;
    content: string;
    author: { id: string; displayName: string };
  }[];
}

export const listPostsHomeService = async () => {
  const { data } = await axiosInstance.get<IPostsReturn>(
    `/posts?key=${process.env.BLOGKEY}&fields=items(id,published,title,content,author(id,displayName))`,
  );

  const posts = data.items.map((el) => {
    const dom = new JSDOM(el.content);

    return {
      ...el,
      published: new Date(el.published),
      img: dom.window.document.querySelector('img').src,
    };
  });

  return posts;
};
