import { Router } from 'express';
import { verifyUserIsAuthenticated } from '../middlewares';
import { upload } from '../utils';
import {
  createImageProfileController,
  deleteImageController,
  updateImageProfileController,
} from '../controllers';

export const imageRouter = Router();

imageRouter.post(
  '/user',
  verifyUserIsAuthenticated,
  upload.single('image'),
  createImageProfileController,
);

imageRouter.delete('/:id', verifyUserIsAuthenticated, deleteImageController);

imageRouter.patch(
  '/user/:id',
  verifyUserIsAuthenticated,
  upload.single('image'),
  updateImageProfileController,
);
