import { JSDOM } from 'jsdom';
import { IPostsBlogReturn } from '../../interfaces';
import prisma from '../../prisma';
import { verifyImageArray } from '../images';
import { verifyUser } from '../user';
import { verifyTagArray } from '../tags';
import { UserVerifySchema } from '../../schemas';



const postBlogReturn = async (postData: {
  published: Date;
  updated: Date;
  images: string[];
  text: string;
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    displayName: string;
  };
  labels: string[];
}) => {
  const {
    id: blog_id,
    images,
    author,
    text,
    title,
    updated,
    published,
    labels,
  } = postData;

  const user = UserVerifySchema.parse(await verifyUser(author));

  let post = await prisma.post.findUnique({ where: { blog_id } });

  if (!post)
    post = await prisma.post.create({
      data: {
        text,
        title,
        updated,
        published,
        blog_id,
        status: 'PUBLISHED',
        is_free: true,
        user_id: user.id,
        view: { create: {} },
      },
    });

  const [imagesData, tags] = await Promise.all([
    verifyImageArray(images, post.id),
    verifyTagArray(labels, post.id),
  ]);

  const cover = imagesData.filter((el) => el.is_cover)[0];

  return { ...post, cover, images: imagesData, tags, user };
};

export const postBlogArrayReturn = async (postsBlog: IPostsBlogReturn) => {
  const postsData = postsBlog.items.map((el) => {
    const dom = new JSDOM(el.content);

    let text = '';
    const images: string[] = [];

    dom.window.document.querySelectorAll('img').forEach((el) => {
      images.push(el.src);
    });

    const ini = dom.window.document.children.length;

    for (let i = 0; i < ini; i++) {
      const base = dom.window.document.children.item(i).textContent;
      if (base) text = base;
    }

    const post = {
      ...el,
      published: new Date(el.published),
      updated: new Date(el.updated),
      images,
      text,
    };

    return postBlogReturn(post);
  });

  return Promise.all(postsData).then((post) => {
    return post;
  });
};
