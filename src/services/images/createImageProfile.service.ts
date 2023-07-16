import { AppError } from '../../errors';
import prisma from '../../prisma';
import 'dotenv/config';

export const createImageProfileService = async (
  { originalname: name, path, size, filename: key }: Express.Multer.File,
  user_id: string,
) => {
  let image = await prisma.imageData.findFirst({
    where: { image: { user_id } },
  });
  if (image) throw new AppError('image profile already exists', 409);

  const data = {
    name,
    size,
    url: path,
    key,
  };

  if (!process.env.APP_URL) {
    image = await prisma.imageData.create({
      data: { ...data, image: { create: { user_id } } },
    });
    return image;
  }

  const url = `${process.env.APP_URL}/files/${key}`;
  data.url = url;

  image = await prisma.imageData.create({
    data: { ...data, image: { create: { user_id } } },
  });

  return image;
};
