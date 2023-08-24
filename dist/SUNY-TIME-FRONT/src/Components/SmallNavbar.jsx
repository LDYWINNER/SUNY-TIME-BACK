"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SmallNavbar_1 = __importDefault(require("../assets/wrappers/SmallNavbar"));
const fa_1 = require("react-icons/fa");
const react_1 = require("@chakra-ui/react");
const baseLinks_1 = __importDefault(require("../utils/baseLinks"));
const NavLinks_1 = __importDefault(require("./NavLinks"));
function SmallSidebar() {
    const { isOpen, onOpen, onClose } = (0, react_1.useDisclosure)();
    return (<>
      <button type="button" className="toggle-btn" onClick={onOpen}>
        <fa_1.FaAlignLeft />
      </button>
      <react_1.Drawer placement="top" onClose={onClose} isOpen={isOpen} closeOnOverlayClick>
        <react_1.DrawerOverlay />
        <react_1.DrawerContent>
          <react_1.DrawerHeader>SUNYTIME</react_1.DrawerHeader>
          <react_1.DrawerCloseButton />
          <react_1.DrawerBody>
            <SmallNavbar_1.default>
              <NavLinks_1.default links={baseLinks_1.default} onClick={onClose}/>
            </SmallNavbar_1.default>
          </react_1.DrawerBody>
        </react_1.DrawerContent>
      </react_1.Drawer>
    </>);
}
exports.default = SmallSidebar;
