import { FC, useRef, useState, useEffect } from "react";
import Konva from "konva";
import { Stage, Layer, Text, Line, Rect } from "react-konva";
// import { Box } from "@chakra-ui/react";

export default function EditorCanvas({
  tool,
  strokeWidth,
  opacity,
  tension,
  penColor,
  stageRef,
  stageX,
  stageY,
  stageColor,
}: {
  tool: string;
  strokeWidth: number;
  opacity: number;
  tension: number;
  penColor: string;
  stageRef: any;
  stageX: number;
  stageY: number;
  stageColor: string;
}) {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const [lastCenter, setLastCenter] = useState(null);
  const [lastDist, setLastDist] = useState(0);
  // Konva.hitOnDragEnabled = true;

  const handleMouseDown = (e) => {
    e.evt.preventDefault();
    if (tool === "cursor") return;
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    const posX = Number(pos.x) + Number(stageX);
    const posY = Number(pos.y) + Number(stageY);
    setLines([
      ...lines,
      { tool, points: [posX, posY], strokeWidth, penColor, opacity },
    ]);
    updatePreview(stageRef);
  };

  const handleMouseMove = (e) => {
    e.evt.preventDefault();
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    const posX = Number(point.x) + Number(stageX);
    const posY = Number(point.y) + Number(stageY);
    lastLine.points = lastLine.points.concat([posX, posY]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
    updatePreview(stageRef);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    setLastDist(0);
    setLastCenter(null);
  };

  return (
    <>
      <style jsx global>{`
        .stage {
          /* iOS等でのスクロール防止(cursor以外) */
          -ms-touch-action: none;
          touch-action: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-user-drag: none;
          /* fixedのためz-indexはいらない */
          z-index: 10;
          /* 画面全体を覆う */
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
        }
        #preview {
          background-color: #e0dfe1;
          position: fixed;
          top: 75px;
          right: 15px;
          opacity: 0.6;
        }
      `}</style>
      <img id="preview" />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className="stage"
        ref={stageRef}
        style={{ position: tool === "cursor" ? "fixed" : "fixed" }}
        x={0 - stageX}
        y={0 - stageY}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.penColor}
              strokeWidth={line.strokeWidth}
              tension={tension}
              opacity={line.opacity}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
}

function updatePreview(stageRef: any) {
  const stage = stageRef.current;
  const scale = 1 / 12;
  // use pixelRatio to generate smaller preview
  const url = stage.toDataURL({ pixelRatio: scale });
  (document.getElementById("preview") as HTMLImageElementae).src = url;
}
