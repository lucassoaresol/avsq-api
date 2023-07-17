import { Request, Response } from 'express';
import {
  createImageProfileService,
  deleteImageService,
  updateImageProfileService,
} from '../services';

export const createImageProfileController = async (
  req: Request,
  res: Response,
) => {
  const image = await createImageProfileService(req.file, req.user.id);
  return res.status(201).json(image);
};

export const deleteImageController = async (req: Request, res: Response) => {
  await deleteImageService(req.params.id);
  return res.status(204).json({});
};

export const updateImageProfileController = async (
  req: Request,
  res: Response,
) => {
  const image = await updateImageProfileService(
    req.file,
    req.params.id,
    req.user.id,
  );
  return res.json(image);
};
