import { Router } from 'express';
import { listPostsHomeController } from '../controllers';

export const postsRouter = Router();

postsRouter.get('/home', listPostsHomeController);
