import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import EditorControls from "./controls";
import CanvasStage from "./stage";

const EditorCanvas = dynamic(() => import("./canvas/base"), {
  ssr: false,
});

export default function EditorPage() {
  const stageRef = useRef(null);
  const [notename, setNotename] = useState("New Widenote");
  const [tool, setTool] = useState("pen");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [penColor, setPenColor] = useState("#000000");
  const [stageColor, setStageColor] = useState("#FFFFFF");
  const [tension, setTension] = useState(0.5);
  const [opacity, setOpacity] = useState(1);
  const [leftPadding, setLeftPadding] = useState(100);
  const [stageX, setStageX] = useState(1000);
  const [stageY, setStageY] = useState(1000);
  const [stageWidth, setStageWidth] = useState(0);
  const [stageHeight, setStageHeight] = useState(0);
  const [activeLayer, setActiveLayer] = useState(1);

  useEffect(() => {
    setStageWidth(window.innerWidth + 2000);
    setStageHeight(window.innerHeight + 2000);
    setStageX(1000);
    setStageY(1000);
    window.scroll(1000, 1000);
  }, []);
  return (
    <>
      <CanvasStage
        tool={tool}
        leftPadding={leftPadding}
        setLeftPadding={(newState) => setLeftPadding(newState)}
        stageX={stageX}
        setStageX={(newState) => setStageX(newState)}
        stageY={stageY}
        setStageY={(newState) => setStageY(newState)}
        stageColor={stageColor}
        stageWidth={stageWidth}
        stageHeight={stageHeight}
      />
      <div id="editor-canvas">
        <EditorCanvas
          tool={tool}
          strokeWidth={strokeWidth}
          penColor={penColor}
          stageRef={stageRef}
          tension={tension}
          opacity={opacity}
          stageX={stageX}
          stageY={stageY}
          stageColor={stageColor}
          activeLayer={activeLayer}
        />
      </div>
      <div id="editor-controls">
        <EditorControls
          stageRef={stageRef}
          notename={notename}
          setNotename={(newState) => setNotename(newState)}
          tool={tool}
          setTool={(newState) => setTool(newState)}
          strokeWidth={strokeWidth}
          setStrokeWidth={(newstate) => setStrokeWidth(newstate)}
          penColor={penColor}
          setPenColor={(newstate) => setPenColor(newstate)}
          tension={tension}
          setTension={(newstate) => setTension(newstate)}
          opacity={opacity}
          setOpacity={(newState) => setOpacity(newState)}
          stageColor={stageColor}
          setStageColor={(newState) => setStageColor(newState)}
          stageWidth={stageWidth}
          setStageWidth={(newState) => setStageWidth(newState)}
          stageHeight={stageHeight}
          setStageHeight={(newState) => setStageHeight(newState)}
          activeLayer={activeLayer}
          setActiveLayer={(newState) => setActiveLayer(newState)}
        />
      </div>
    </>
  );
}
