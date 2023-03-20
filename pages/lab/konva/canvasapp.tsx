import { FC } from "react";
import dynamic from "next/dynamic";

const StageComponent = dynamic(
  () => import("../../../components/papyrus/canvas"),
  {
    ssr: false,
  }
);
const CanvasPage: FC = () => {
  return <><style jsx global>{`.maincanvas {-webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;}`}</style><div className="maincanvas"><StageComponent /></div></>;
};

export default CanvasPage;
