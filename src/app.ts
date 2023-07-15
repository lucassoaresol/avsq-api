import 'express-async-errors';
import express from 'express';
import { errorHandler } from './errors';
import {
  passwordRouter,
  postsRouter,
  sessionRouter,
  userRouter,
} from './router';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});

app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.use('/login', sessionRouter);
app.use('/password', passwordRouter);

app.use(errorHandler);

export default app;
