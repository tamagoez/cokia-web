import { FC, useRef, useState } from "react";
import { Stage, Layer, Text, Line } from "react-konva";

export default function EditorCanvas({ tool }: { tool: string }) {
  const [lines, setLines] = useState([]);
  const [tension, setTension] = useState(0.5);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [penColor, setPenColor] = useState("#000000");
  const stageRef = useRef(null);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    e.evt.preventDefault();
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([
      ...lines,
      { tool, points: [pos.x, pos.y], strokeWidth, tension, penColor },
    ]);
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
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };
  return (
    <>
      <style jsx global>{`
        .stage {
          -ms-touch-action: none;
          touch-action: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-user-drag: none; 
        }
      `}</style>
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
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.penColor}
              strokeWidth={line.strokeWidth}
              tension={line.tension}
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
