import NextLink from "next/link";
import { Button, Heading } from "@chakra-ui/react";
export default function IndexPage() {
  return (
    <>
      <Heading>Cokia</Heading>
      <Button colorScheme="teal" variant="solid">
        新規登録
      </Button>
      <Button as={NextLink} href="/login">
        ログイン
      </Button>
    </>
  );
}
