import axiosInstance from 'axios';
import 'dotenv/config';

const baseURL =
  'https://www.googleapis.com/blogger/v3/blogs/' + process.env.BLOGID;

const axios = axiosInstance.create({
  baseURL,
  timeout: 100000,
});

export default axios;
