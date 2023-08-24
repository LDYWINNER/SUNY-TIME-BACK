"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hi_1 = require("react-icons/hi");
const recoil_1 = require("recoil");
const BulletinPagination_1 = __importDefault(require("../assets/wrappers/BulletinPagination"));
const atoms_1 = require("../atoms");
const CoursePagination = () => {
    const [{ courseNumOfPages, coursePage }, setGlobalState] = (0, recoil_1.useRecoilState)(atoms_1.globalCurrentState);
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
            return Object.assign(Object.assign({}, currentState), { coursePage: newPage });
        });
    };
    const prevPage = () => {
        let newPage = coursePage - 1;
        if (newPage < 1) {
            newPage = courseNumOfPages;
        }
        //change page
        setGlobalState((currentState) => {
            return Object.assign(Object.assign({}, currentState), { coursePage: newPage });
        });
    };
    return (<BulletinPagination_1.default>
      <button className="prev-btn" onClick={prevPage}>
        <hi_1.HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
            return (<button type="button" className={pageNumber === coursePage ? "pageBtn active" : "pageBtn"} key={pageNumber} onClick={() => {
                    //change page
                    setGlobalState((currentState) => {
                        return Object.assign(Object.assign({}, currentState), { coursePage: pageNumber });
                    });
                }}>
              {pageNumber}
            </button>);
        })}
      </div>
      <button className="next-btn" onClick={nextPage}>
        next
        <hi_1.HiChevronDoubleRight />
      </button>
    </BulletinPagination_1.default>);
};
exports.default = CoursePagination;
