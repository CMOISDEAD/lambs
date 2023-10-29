import {
  Card,
  CardBody,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home() {
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
          <HStack>
            <PinInput
              size="lg"
              type="alphanumeric"
              onComplete={handleRoom}
              autoFocus
            >
              <PinInputField className="uppercase" />
              <PinInputField className="uppercase" />
              <PinInputField className="uppercase" />
              <PinInputField className="uppercase" />
            </PinInput>
          </HStack>
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
          <ModalHeader>Searching Room</ModalHeader>
          <ModalBody>Loading...</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Home;
