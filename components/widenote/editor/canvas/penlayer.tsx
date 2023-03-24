import { useState } from "react";
import { Stage, Layer, Text, Line, Rect } from "react-konva";

export default function PenLayer({
  id,
  allLines,
}: {
  id: number;
  allLines: any;
}) {
  const lines = allLines.find((item) => item.id == id).data;
  console.log(lines);
  return (
    <>
      <Layer>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke={line.penColor}
            strokeWidth={line.strokeWidth}
            tension={0.5}
            opacity={line.opacity}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={
              line.tool === "eraser" ? "destination-out" : "source-over"
            }
          />
        ))}
      </Layer>
    </>
  );
}
