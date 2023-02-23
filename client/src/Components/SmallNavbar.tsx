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
import NavLinks from "./NavLinks";

function SmallSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button type="button" className="toggle-btn" onClick={onOpen}>
        <FaAlignLeft />
      </button>
      <Drawer
        placement="top"
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>SUNYTIME</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <Wrapper>
              <NavLinks links={links} />
            </Wrapper>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default SmallSidebar;
