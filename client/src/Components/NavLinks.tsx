import { NavLink } from "react-router-dom";
import { Content } from "../assets/wrappers/NavLinks";
import { IoIosArrowForward } from "react-icons/io";

interface ILink {
  id: number;
  text: string;
  path: string;
}

interface INavLinks {
  links: ILink[];
  onClick?: () => void;
}

const NavLinks = ({ links, onClick }: INavLinks) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={onClick}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            <Content>
              <h4>{text}</h4>
              <IoIosArrowForward />
            </Content>
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
