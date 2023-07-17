import { Request, Response } from 'express';
import {
  listPostsBlogService,
  listPostsHomeService,
  listPostsService,
  retrievePostService,
} from '../services';

export const listPostsController = async (req: Request, res: Response) => {
  const posts = await listPostsService(req.query);
  return res.json(posts);
};

export const listPostsBlogController = async (req: Request, res: Response) => {
  const posts = await listPostsBlogService(req.query);
  return res.json(posts);
};

export const listPostsHomeController = async (req: Request, res: Response) => {
  const posts = await listPostsHomeService();
  return res.json(posts);
};

export const retrievePostController = async (req: Request, res: Response) => {
  const posts = await retrievePostService(req.params.id);
  return res.json(posts);
};
