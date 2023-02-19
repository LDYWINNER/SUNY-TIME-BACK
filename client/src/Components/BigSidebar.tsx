import Wrapper from "../assets/wrappers/BigSidebar";
import { FaAlignLeft } from "react-icons/fa";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import links from "../utils/bulletinLinks";
import { NavLink } from "react-router-dom";

function BigSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button type="button" className="toggle-btn" onClick={onOpen}>
        <FaAlignLeft />
      </button>
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        isFullHeight={false}
      >
        <DrawerContent marginTop="100px" w="15">
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <Wrapper>
              <div className="nav-links">
                {links.map((link) => {
                  const { text, path, id } = link;
                  return (
                    <NavLink
                      to={path}
                      key={id}
                      onClick={onOpen}
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
            </Wrapper>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default BigSidebar;
