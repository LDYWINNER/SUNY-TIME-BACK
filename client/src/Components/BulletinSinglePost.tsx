interface IPostComment {
  content: string;
  likes: number;
  dislikes: number;
  createdBy: string;
  updatedAt: string;
}

interface IPost {
  comments: [IPostComment];
  anonymity: Boolean;
  board: string;
  content: string;
  createdAt: string;
  createdBy: string;
  dislikes: number;
  existingBoard: string;
  likes: number;
  newBoard: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

const BulletinSinglePost = ({ content }: IPost) => {
  return <h1>{content}</h1>;
};

export default BulletinSinglePost;
