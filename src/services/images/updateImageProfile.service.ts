import { v2 as cloudinary } from 'cloudinary';
import prisma from '../../prisma';
import fs from 'node:fs';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { AppError } from '../../errors';
import 'dotenv/config';

export const updateImageProfileService = async (
  { originalname: name, path, size, filename: key }: Express.Multer.File,
  id: string,
  user_id: string,
) => {
  try {
    const { key: keyData } = await prisma.imageData.delete({
      where: { id },
    });
    if (!process.env.APP_URL) {
      await cloudinary.uploader.destroy(keyData);
    } else {
      promisify(fs.unlink)(
        resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', keyData),
      );
    }

    const data = {
      name,
      size,
      url: path,
      key,
    };

    if (!process.env.APP_URL) {
      const image = await prisma.imageData.create({
        data: { ...data, image: { create: { user_id } } },
      });
      return image;
    }

    const url = `${process.env.APP_URL}/files/${key}`;
    data.url = url;

    const image = await prisma.imageData.create({
      data: { ...data, image: { create: { user_id } } },
    });

    return image;
  } catch {
    throw new AppError('error when updating image', 400);
  }
};
