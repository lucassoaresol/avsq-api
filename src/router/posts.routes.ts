import { Router } from 'express';
import { listPostsController, listPostsHomeController } from '../controllers';

export const postsRouter = Router();

postsRouter.get('', listPostsController);

postsRouter.get('/home', listPostsHomeController);
