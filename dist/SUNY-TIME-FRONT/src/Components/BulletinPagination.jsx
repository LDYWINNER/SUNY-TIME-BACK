"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hi_1 = require("react-icons/hi");
const recoil_1 = require("recoil");
const BulletinPagination_1 = __importDefault(require("../assets/wrappers/BulletinPagination"));
const atoms_1 = require("../atoms");
const BulletinPagination = () => {
    const [{ bulletinNumOfPages, bulletinPage }, setGlobalState] = (0, recoil_1.useRecoilState)(atoms_1.globalCurrentState);
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
            return Object.assign(Object.assign({}, currentState), { bulletinPage: newPage });
        });
    };
    const prevPage = () => {
        let newPage = bulletinPage - 1;
        if (newPage < 1) {
            newPage = bulletinNumOfPages;
        }
        //change page
        setGlobalState((currentState) => {
            return Object.assign(Object.assign({}, currentState), { bulletinPage: newPage });
        });
    };
    return (<BulletinPagination_1.default>
      <button className="prev-btn" onClick={prevPage}>
        <hi_1.HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
            return (<button type="button" className={pageNumber === bulletinPage ? "pageBtn active" : "pageBtn"} key={pageNumber} onClick={() => {
                    //change page
                    setGlobalState((currentState) => {
                        return Object.assign(Object.assign({}, currentState), { bulletinPage: pageNumber });
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
exports.default = BulletinPagination;
