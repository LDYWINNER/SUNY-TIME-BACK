import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";

interface ILink {
  id: number;
  text: string;
  path: string;
}

interface IBigSidebar {
  links: ILink[];
  showSidebar: boolean;
}

const BigSidebar = ({ links, showSidebar }: IBigSidebar) => {
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <NavLinks links={links} />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
