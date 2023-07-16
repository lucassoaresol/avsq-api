import prisma from '../../prisma';

export const verifyImage = async (
  url: string,
  post_id = '',
  is_cover = false,
) => {
  let image = await prisma.image.findUnique({
    where: { url },
    select: { id: true, url: true },
  });

  if (!image)
    image = await prisma.image.create({
      data: { url },
      select: { id: true, url: true },
    });

  if (post_id.length > 0) {
    await prisma.post.update({
      where: { id: post_id },
      data: {
        images: {
          connectOrCreate: {
            create: { image_id: image.id, is_cover },
            where: { post_id_image_id: { image_id: image.id, post_id } },
          },
        },
      },
    });

    return { ...image, is_cover };
  }

  return image;
};

export const verifyImageArray = async (
  imagesData: string[],
  post_id: string,
) => {
  const images = imagesData.map((el, index) => {
    if (index === 0) return verifyImage(el, post_id, true);
    return verifyImage(el, post_id);
  });

  return Promise.all(images).then((image) => {
    return image;
  });
};
