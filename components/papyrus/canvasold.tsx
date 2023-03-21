import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { FC, useRef, useState } from "react";
import { Stage, Layer, Text, Line } from "react-konva";
import {MdOutlineSaveAlt} from "react-icons/md"

const CanvasComponent: FC = () => {
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [tension, setTension] = useState(0.5);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [penColor, setPenColor] = useState("#000000");
  const [canvasname, setCanvasname] = useState("New Canvas")
  const stageRef = useRef(null)
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    // e.preventDefault()
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y], strokeWidth, tension, penColor }]);
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
  
  function downloadImg() {
  if (typeof window === "undefined") return;
       const name = canvasname;
       const uri = stageRef.current.toDataURL({ pixelRatio: window.devicePixelRatio})
        const link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // delete link;
      }
  return (
    <div>
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
        <Input id="canvasname" value={canvasname} onChange={(e) => setCanvasname(e.target.value)} />
        <IconButton onClick={() => downloadImg()} aria-label="Save" icon={<MdOutlineSaveAlt />} />
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
      <div className="stage" onTouchStart={(e) => {e.preventDefault()}} onTouchMove={(e) => {e.preventDefault()}}>
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
      <Layer><Text text={`[${canvasname}] on Cokia`} x={5} y={30} /></Layer>
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
      </div>
    </div>
  );
};

export default CanvasComponent;
