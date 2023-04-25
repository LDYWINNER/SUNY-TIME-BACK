import styled from "styled-components";
import { motion } from "framer-motion";

const Nav = styled(motion.nav)`
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100px;
  top: 0;
  font-size: 18px;
  font-weight: 400;
  text-shadow: -1.5px 0 ${(props) => props.theme.main.blue},
    0 1.5px ${(props) => props.theme.main.blue},
    1.5px 0 ${(props) => props.theme.main.blue},
    0 -1.5px ${(props) => props.theme.main.blue};
  padding: 20px 60px;
  color: white;
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
    background-color: ${(props) => props.theme.main.blue};
  }
  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: ${(props) => props.theme.main.blue};
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: ${(props) => props.theme.white.lighter};
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: ${(props) => props.theme.main.blue};
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .disabled-link {
    pointer-events: none;
  }
  a:disabled {
    pointer-events: none;
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.img)`
  margin-right: 50px;
  width: 150px;
  height: 50px;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

export { Nav, Col, Logo, Items, Item, Circle, navVariants };
