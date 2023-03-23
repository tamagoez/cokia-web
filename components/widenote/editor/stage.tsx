export default function CanvasStage({ tool }: { tool: string }) {
  const zindex = tool === "cursor" ? 20 : -1;
  const position = tool === "cursor" ? "fixed" : "absolute";
  const opacity = tool === "cursor" ? 0.6 : 1;
  return (
    <>
      <style jsx global>{`
        .CanvasStage {
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
        className="CanvasStage"
        style={{
          width: "120vw",
          height: "120vh",
          zIndex: zindex,
          position: position,
          opacity: opacity,
        }}
        onClick={() => alert("OK")}
      />
    </>
  );
}
