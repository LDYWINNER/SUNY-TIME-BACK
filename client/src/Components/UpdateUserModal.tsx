import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface IUpdateUserModal {
  isOpen: boolean;
  onClose: () => void;
}

function UpdateUserModal({ isOpen, onClose }: IUpdateUserModal) {
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1>Hello</h1>
          </ModalBody>

          <ModalFooter>
            <button>Save</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateUserModal;
