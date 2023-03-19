import { FC } from "react";
import dynamic from "next/dynamic";

const StageComponent = dynamic(
  () => import("../../../components/papyrus/canvas"),
  {
    ssr: false,
  }
);
const CanvasPage: FC = () => {
  return <StageComponent />;
};

export default CanvasPage;
