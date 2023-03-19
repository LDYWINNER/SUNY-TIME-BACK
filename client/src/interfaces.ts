export interface IPostComment {
  content: string;
  likes: [string];
  createdBy: string;
  createdAt: string;
}

export interface IPost {
  comments: [IPostComment];
  anonymity: Boolean;
  content: string;
  createdAt: string;
  createdBy: string;
  createdByUsername: string;
  likes: [string];
  board: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
