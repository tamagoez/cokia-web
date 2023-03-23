import { useEffect } from "react";

export default function CanvasStage({
  tool,
  stageX,
  setStageX,
  stageY,
  setStageY,
  leftPadding,
  setLeftPadding,
  stageWidth,
  stageHeight,
}: {
  tool: string;
  stageX: number;
  setStageX: any;
  stageY: number;
  setStageY: any;
  leftPadding: number;
  setLeftPadding: any;
  stageWidth: number;
  stageHeight: number;
}) {
  // サイズ変更
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setStageX(window.pageXOffset);
        setStageY(window.pageYOffset);
        console.log(window.pageXOffset);
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [stageX, stageY, stageWidth, stageHeight]);
  const zindex = tool === "cursor" ? 20 : -1;
  const position = tool === "cursor" ? "absolute" : "absolute";
  const opacity = tool === "cursor" ? 0.7 : 1;
  return (
    <>
      <style jsx global>{`
        #CanvasStage {
          /* サイズを適当にここで設定 */
          /* 方眼紙模様に必須のスタイル */
          background-image: linear-gradient(
              0deg,
              transparent calc(100% - 1px),
              #f0f0f0 calc(100% - 1px)
            ),
            linear-gradient(
              90deg,
              transparent calc(100% - 1px),
              #f0f0f0 calc(100% - 1px)
            );
          background-size: 16px 16px;
          background-repeat: repeat;
          background-position: center center;
        }
      `}</style>
      <div
        id="CanvasStage"
        style={{
          width: stageWidth + "px",
          height: stageHeight + "px",
          zIndex: zindex,
          position: position,
          opacity: opacity,
        }}
      />
    </>
  );
}
