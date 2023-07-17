import { Router } from 'express';
import {
  listPostsBlogController,
  listPostsController,
  listPostsHomeController,
} from '../controllers';

export const postsRouter = Router();

postsRouter.get('', listPostsController);

postsRouter.get('/blog', listPostsBlogController);

postsRouter.get('/home', listPostsHomeController);
