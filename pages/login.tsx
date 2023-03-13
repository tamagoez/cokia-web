import NextLink from "next/link";
import {
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Button,
  ButtonGroup,
  Stack,
  Center,
  Divider,
  Text,
  Link,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signInWithEmailPass } from "../scripts/auth/signin";
import { OAuthList } from "../components/auth/oauth";

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [logining, setLogining] = useState(false);
  // https://qiita.com/kne-cr/items/eba5d331c7ae781bd1c6
  const isEmail = !email.match(/.+@.+\..+/);
  const isPass = pass == "";
  const toast = useToast();
  async function loginprocess() {
    try {
      await signInWithEmailPass(email, pass);
      router.replace("/callback");
    } catch (err) {
      toast({
        title: "Login Failed",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  useEffect(() => {
    let tparam = decodeURI(
      new URL(window.location.href).searchParams.get("moveto")
    );
    if (typeof window !== "undefined") {
      sessionStorage.setItem("moveto", tparam);
    }
  }, []);
  return (
    <>
      <style jsx>{`
      .mainbox {
  display: flex;
  justify-content: center;
  align-items: center;
`}</style>
      <div className="mainbox">
        <Container>
          <Heading my="5">Login</Heading>
          <Center>
            <OAuthList />
          </Center>
          <Divider my="2" />
          <FormControl isInvalid={isEmail} mb="2">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="flushed"
            />
            {!isEmail ? <></> : <></>}
          </FormControl>
          <FormControl isInvalid={isPass}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                variant="flushed"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {!isPass ? <></> : <></>}
          </FormControl>
          <Center>
            <Link as={NextLink} mt="4" color="gray" fontSize="sm" href="#">
              Forgot your password? Click here
            </Link>
          </Center>
          <Center>
            <Stack direction="row" spacing={4} align="center" mt="5">
              <Button
                colorScheme="teal"
                variant="solid"
                isLoading={logining}
                isDisabled={isEmail || isPass}
                onClick={() => loginprocess()}
              >
                Login
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                as={NextLink}
                href="/signup"
              >
                Signup
              </Button>
            </Stack>
          </Center>
        </Container>
      </div>
    </>
  );
}
