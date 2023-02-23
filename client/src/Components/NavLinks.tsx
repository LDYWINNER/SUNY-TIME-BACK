import { NavLink } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

interface ILink {
  id: number;
  text: string;
  path: string;
}

interface INavLinks {
  links: ILink[];
}

const NavLinks = ({ links }: INavLinks) => {
  const { onClose } = useDisclosure();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={onClose}
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
