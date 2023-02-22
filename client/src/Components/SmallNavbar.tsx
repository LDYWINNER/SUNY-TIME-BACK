import Wrapper from "../assets/wrappers/SmallNavbar";
import { FaAlignLeft } from "react-icons/fa";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import links from "../utils/baseLinks";
import { NavLink } from "react-router-dom";

function SmallSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button type="button" className="toggle-btn" onClick={onOpen}>
        <FaAlignLeft />
      </button>
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>SUNYTIME</DrawerHeader>
          <DrawerCloseButton />
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
export default SmallSidebar;
