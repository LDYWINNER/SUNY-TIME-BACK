import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useRecoilState } from "recoil";
import Wrapper from "../assets/wrappers/BulletinPagination";
import { globalCurrentState } from "../atoms";

const BulletinPagination = () => {
  const [{ bulletinNumOfPages, bulletinPage }, setGlobalState] =
    useRecoilState(globalCurrentState);

  const pages = Array.from({ length: bulletinNumOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = bulletinPage + 1;
    if (newPage > bulletinNumOfPages) {
      newPage = 1;
    }
    //change page
    setGlobalState((currentState) => {
      return {
        ...currentState,
        bulletinPage: newPage,
      };
    });
  };
  const prevPage = () => {
    let newPage = bulletinPage - 1;
    if (newPage < 1) {
      newPage = bulletinNumOfPages;
    }
    //change page
    setGlobalState((currentState) => {
      return {
        ...currentState,
        bulletinPage: newPage,
      };
    });
  };
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              className={
                pageNumber === bulletinPage ? "pageBtn active" : "pageBtn"
              }
              key={pageNumber}
              onClick={() => {
                //change page
                setGlobalState((currentState) => {
                  return {
                    ...currentState,
                    bulletinPage: pageNumber,
                  };
                });
              }}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default BulletinPagination;
