import { Request, Response } from 'express';
import { listPostsHomeService } from '../services';

export const listPostsHomeController = async (req: Request, res: Response) => {
  const posts = await listPostsHomeService();
  return res.json(posts);
};
