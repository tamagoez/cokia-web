import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

import { useEffect, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";

export function AlertOnClose() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const cancelRef = useRef();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      // onOpen();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return <></>;

}
