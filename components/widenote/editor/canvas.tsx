import { FC, useRef, useState } from "react";
import Konva from "konva";
import { Stage, Layer, Text, Line } from "react-konva";
// import { Box } from "@chakra-ui/react";

export default function EditorCanvas({
  tool,
  strokeWidth,
  opacity,
  tension,
  penColor,
  stageRef,
}: {
  tool: string;
  strokeWidth: number;
  opacity: number;
  tension: number;
  penColor: string;
  stageRef: any;
}) {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const [lastCenter, setLastCenter] = useState(null);
  const [lastDist, setLastDist] = useState(0);
  Konva.hitOnDragEnabled = true;

  const handleMouseDown = (e) => {
    e.evt.preventDefault();
    if (tool === "cursor") return;
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([
      ...lines,
      { tool, points: [pos.x, pos.y], strokeWidth, penColor, opacity },
    ]);
  };

  const handleMouseMove = (e) => {
    e.evt.preventDefault();
    if (tool === "cursor") {
      cursorMove(
        e,
        stageRef,
        lastCenter,
        (newState) => setLastCenter(newState),
        lastDist,
        (newState) => setLastDist(newState)
      );
      return;
    }
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
    setLastDist(0);
    setLastCenter(null);
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

function cursorMove(
  e: any,
  stageRef: any,
  lastCenter,
  setLastCenter,
  lastDist,
  setLastDist
) {
  alert(e.evt.touches.length);
  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  function getCenter(p1, p2) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  }
  const stage = stageRef.current;
  const touch1 = e.evt.touches[0];
  const touch2 = e.evt.touches[1];

  if (touch1 && touch2) {
    // if the stage was under Konva's drag&drop
    // we need to stop it, and implement our own pan logic with two pointers
    if (stage.isDragging()) {
      stage.stopDrag();
    }

    var p1 = {
      x: touch1.clientX,
      y: touch1.clientY,
    };
    var p2 = {
      x: touch2.clientX,
      y: touch2.clientY,
    };

    if (!lastCenter) {
      setLastCenter(getCenter(p1, p2));
      return;
    }
    var newCenter = getCenter(p1, p2);

    var dist = getDistance(p1, p2);

    if (!lastDist) {
      setLastDist(dist);
    }

    // local coordinates of center point
    var pointTo = {
      x: (newCenter.x - stage.x()) / stage.scaleX(),
      y: (newCenter.y - stage.y()) / stage.scaleX(),
    };

    var scale = stage.scaleX() * (dist / lastDist);

    stage.scaleX(scale);
    stage.scaleY(scale);

    // calculate new position of the stage
    var dx = newCenter.x - lastCenter.x;
    var dy = newCenter.y - lastCenter.y;

    var newPos = {
      x: newCenter.x - pointTo.x * scale + dx,
      y: newCenter.y - pointTo.y * scale + dy,
    };

    stage.position(newPos);

    setLastDist(dist);
    setLastCenter(newCenter);
  }
}
