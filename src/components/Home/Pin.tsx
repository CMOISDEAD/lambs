import {
  Card,
  CardBody,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import useClassStore from "../../store/store";

export const Pin = () => {
  const { user } = useClassStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleRoom = (code: string) => {
    onOpen();
    setTimeout(() => {
      navigate(`/exam/${code}`);
    }, 1000);
  };

  return (
    <div className="flex justify-center content-center items-center h-[80vh]">
      <Card variant="outline">
        <CardBody>
          <Text className="font-bold">Enter your room code:</Text>
          <HStack className="my-3">
            <PinInput
              autoFocus
              size="lg"
              type="alphanumeric"
              onComplete={handleRoom}
              isDisabled={!user.isAuth}
            >
              <PinInputField className="uppercase" />
              <PinInputField className="uppercase" />
              <PinInputField className="uppercase" />
              <PinInputField className="uppercase" />
            </PinInput>
          </HStack>
          {!user.isAuth && (
            <Text color="red" align="center" className="text-xs">
              You need to login first
            </Text>
          )}
        </CardBody>
      </Card>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Searching room</ModalHeader>
          <ModalBody className="flex justify-center content-center items-center">
            <BiLoaderAlt className="text-3xl animate-spin" />
          </ModalBody>
          <ModalFooter>
            <Text color="gray" align="center" fontSize="sm">
              Please wait while we are searching the room
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
