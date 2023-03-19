import { Wrapper, Comment } from "../assets/wrappers/BulletinAllComments";

interface IPostComment {
  content: string;
  likes: [string];
  createdBy: string;
  createdAt: string;
}

interface IBulletinAllComments {
  comments: [IPostComment];
}

function BulletinAllComments({ comments }: IBulletinAllComments) {
  if (comments === undefined) {
    return <h1>Something wrong...</h1>;
  }
  return (
    <Wrapper>
      {comments.map((comment: IPostComment) => {
        return (
          <Comment>
            <h4>{comment.content}</h4>
            <h4>{comment.likes.length}</h4>
            <h4>{comment.createdBy}</h4>
            <h4>{comment.createdAt}</h4>
          </Comment>
        );
      })}
    </Wrapper>
  );
}
export default BulletinAllComments;
