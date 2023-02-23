import { NavLink } from "react-router-dom";

interface ILink {
  id: number;
  text: string;
  path: string;
}

interface INavLinks {
  links: ILink[];
  onClick: () => void;
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
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
