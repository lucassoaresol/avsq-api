import { Request, Response } from 'express';
import { listPostsHomeService, listPostsService } from '../services';

export const listPostsController = async (req: Request, res: Response) => {
  const posts = await listPostsService(req.query);
  return res.json(posts);
};

export const listPostsHomeController = async (req: Request, res: Response) => {
  const posts = await listPostsHomeService();
  return res.json(posts);
};
