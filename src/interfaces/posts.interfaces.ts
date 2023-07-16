export interface IPostBlog {
  id: string;
  published: string;
  updated: string;
  title: string;
  content: string;
  author: { id: string; displayName: string };
  labels: string[];
}

export interface IPostsBlogReturn {
  nextPageToken: string;
  items: IPostBlog[];
}

export interface IPostQuery {
  pageToken?: string;
}
