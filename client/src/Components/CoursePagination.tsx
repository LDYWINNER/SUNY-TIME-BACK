import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useRecoilState } from "recoil";
import Wrapper from "../assets/wrappers/BulletinPagination";
import { globalCurrentState } from "../atoms";

const CoursePagination = () => {
  const [{ courseNumOfPages, coursePage }, setGlobalState] =
    useRecoilState(globalCurrentState);

  const pages = Array.from({ length: courseNumOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = coursePage + 1;
    if (newPage > courseNumOfPages) {
      newPage = 1;
    }
    //change page
    setGlobalState((currentState) => {
      return {
        ...currentState,
        coursePage: newPage,
      };
    });
  };
  const prevPage = () => {
    let newPage = coursePage - 1;
    if (newPage < 1) {
      newPage = courseNumOfPages;
    }
    //change page
    setGlobalState((currentState) => {
      return {
        ...currentState,
        coursePage: newPage,
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
                pageNumber === coursePage ? "pageBtn active" : "pageBtn"
              }
              key={pageNumber}
              onClick={() => {
                //change page
                setGlobalState((currentState) => {
                  return {
                    ...currentState,
                    coursePage: pageNumber,
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

export default CoursePagination;
