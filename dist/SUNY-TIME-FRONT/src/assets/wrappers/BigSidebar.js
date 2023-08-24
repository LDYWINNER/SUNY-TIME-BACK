"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_components_1 = __importDefault(require("styled-components"));
const Wrapper = styled_components_1.default.aside `
  box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
  .sidebar-container {
    background: var(--white);
    height: 60vh;
    width: 250px;
    margin-left: -250px;
    margin-top: 15px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: var(--transition);
    position: fixed;
    box-shadow: 3px 0px 0px 0px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  .show-sidebar {
    margin-left: 0;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    padding: 1rem 0;
    padding-left: 2.5rem;
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    background: var(--grey-50);
    padding-left: 3rem;
    color: ${(props) => props.theme.main.blue};
    font-weight: 500;
  }
  .active {
    color: ${(props) => props.theme.main.blue};
    font-weight: 500;
  }
`;
exports.default = Wrapper;
