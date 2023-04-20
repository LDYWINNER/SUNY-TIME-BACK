import styled from "styled-components";

export const LoadingWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.section<{ bgImage: string }>`
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`;

export const Container = styled.div`
  margin-top: 100px;
  z-index: 0;
  width: 70%;
  height: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.bgColor.lighter};
  padding: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  h1 {
    font-weight: 600;
    font-size: 3rem;
  }
`;

export const Main = styled.div`
  padding: 0.5rem 3rem;
`;

export const TitleRow = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    background-color: ${(props) => props.theme.main.blue};
  }
`;

export const Title = styled.span`
  font-size: 5vh;
  font-weight: 600;
  color: ${(props) => props.theme.main.blue};
  font-family: "Bebas Neue", cursive;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const IconRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  h4 {
    margin-left: 0.5rem;
  }
`;

export const PostContent = styled.div`
  margin-bottom: 2rem;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .time {
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
  }
`;

export const Comments = styled.div``;
