import {
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  ButtonGroup,
  Stack,
  Center,
  Divider,
  Text,
  Link,
  InputGroup,
  Button,
  InputRightElement,
  Checkbox,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { signUpWithEmailPass } from "../scripts/auth/signup";
import { OAuthList } from "../components/auth/oauth";

export default function LoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [birthday, setBirthday] = useState("");
  // const [username, setUsername] = useState("");
  const [logining, setLogining] = useState(false);
  const [check, setCheck] = useState(false);
  // https://qiita.com/kne-cr/items/eba5d331c7ae781bd1c6
  const isEmail = !email.match(/.+@.+\..+/);
  const isPass = pass == "";
  // const isUsername = username == "";
  const viewvariant = "flushed";
  const isBirthday = birthday == "";
  // モーダル
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalbtnRef = useRef(null);
  const toast = useToast();
  async function signupprocess() {
    try {
      await signUpWithEmailPass(email, pass, birthday);
      toast({
        title: "Signup Succeed!",
        description: "Check your email",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
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
  function moveauth() {
    if (typeof window === "undefined") return;
    const savedata = { email: email, pass: pass };
    sessionStorage.setItem("authinfo", JSON.stringify(savedata));
    router.push("/login");
  }
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
          <Heading my="5">Signup</Heading>
          <Center>
            <OAuthList />
          </Center>
          <Divider my="2" />
          <FormControl isInvalid={isEmail} mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant={viewvariant}
            />
            {!isEmail ? <></> : <></>}
          </FormControl>
          <FormControl isInvalid={isPass} mb="4">
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                variant={viewvariant}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {!isPass ? <></> : <></>}
          </FormControl>
          <FormControl isInvalid={isBirthday} mb="4">
            <FormLabel>Birthday</FormLabel>
            <Input
              type="datetime-local"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              variant={viewvariant}
            />
            {!isBirthday ? <></> : <></>}
          </FormControl>
          <Checkbox isChecked={check} ref={modalbtnRef} onChange={onOpen}>
            利用規約に同意する
          </Checkbox>
          <Center>
            <Stack direction="row" spacing={4} align="center" mt="5">
              <Button
                colorScheme="teal"
                variant="solid"
                isLoading={logining}
                isDisabled={isEmail || isPass || isBirthday || !check}
                onClick={() => signupprocess()}
              >
                Signup
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={() => moveauth()}
              >
                Login
              </Button>
            </Stack>
          </Center>
        </Container>
      </div>
      <Modal
        onClose={onClose}
        finalFocusRef={modalbtnRef}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>利用規約</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <br />
            <Button onClick={() => setCheck(false)} mr="1">
              利用規約の内容に同意しない
            </Button>
            <Button onClick={() => setCheck(true)}>
              利用規約の内容全てに同意する
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
