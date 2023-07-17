import { Router } from 'express';
import {
  listPostsBlogController,
  listPostsController,
  listPostsHomeController,
  retrievePostController,
} from '../controllers';

export const postsRouter = Router();

postsRouter.get('', listPostsController);

postsRouter.get('/blog', listPostsBlogController);

postsRouter.get('/home', listPostsHomeController);

postsRouter.get('/:id', retrievePostController);
