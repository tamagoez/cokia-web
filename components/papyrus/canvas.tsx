import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { FC, useRef, useState } from "react";
import { Stage, Layer, Text, Line } from "react-konva";

const CanvasComponent: FC = () => {
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [tension, setTension] = useState(0.5);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [penColor, setPenColor] = useState("#000000");
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
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
    <div>
      <style jsx global>{`
        .stage {
          -ms-touch-action: none;
          touch-action: none;
        }
      `}</style>
      <div>
        <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
        <input
          type="color"
          id="head"
          name="head"
          value={penColor}
          onChange={(e) => {
            setPenColor(e.target.value);
          }}
        />
        <Slider
          aria-label="slider-ex-1"
          value={strokeWidth}
          onChange={(val) => setStrokeWidth(val)}
          min={0}
          max={50}
          step={0.1}
        >
          <SliderMark
            value={strokeWidth}
            textAlign="center"
            bg="blue.500"
            color="white"
            mb="-10"
            ml="-6"
            w="14"
          >
            {strokeWidth} pt
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Slider
          aria-label="slider-ex-2"
          value={tension}
          onChange={(val) => setTension(val)}
          min={0}
          max={10}
          step={0.1}
        >
          <SliderMark
            value={tension}
            textAlign="center"
            bg="blue.500"
            color="white"
            mb="-10"
            ml="-12"
            w="24"
          >
            {tension} tension
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </div>
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
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={penColor}
              strokeWidth={strokeWidth}
              tension={tension}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasComponent;
