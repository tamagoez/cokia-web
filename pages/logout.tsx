import {
  Center,
  Heading,
  Text,
  Spinner,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { signOut } from "../scripts/auth/signout";

export default function LogoutPage() {
  const router = useRouter();
  const toast = useToast();
  async function logoutproc() {
    try {
      await signOut();
      location.replace("/");
    } catch (err) {
      toast({
        title: "Signout Failed",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  useEffect(() => {
    logoutproc();
  }, []);
  return (
    <>
      <Center mt="5">
        <Heading fontSize="2xl" ml="2">
          Logouting...
        </Heading>
        <CircularProgress ml="3" isIndeterminate />
      </Center>
      <Center mt="3">
        <Text>Thanks for using!</Text>
      </Center>
    </>
  );
}