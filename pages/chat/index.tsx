import { Button, Heading } from "@chakra-ui/react";
import { ModalAddRoom } from "../../components/chat";

export default function ChatIndex() {
  return (
    <>
      <Heading fontSize="3xl">Chat</Heading>
      <ModalAddRoom />
    </>
  );
}
