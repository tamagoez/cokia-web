import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function Dashboard() {
  const router = useRouter();
  return (
    <>
      <h1>Dashboard</h1>
      <Button
        onClick={() => {
          router.push("/logout");
        }}
      >
        ログアウト
      </Button>
    </>
  );
}
