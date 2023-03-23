import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import EditorControls from "./controls";
import CanvasStage from "./stage";

const EditorCanvas = dynamic(() => import("./canvas"), {
  ssr: false,
});

export default function EditorPage() {
  const stageRef = useRef(null);
  const [notename, setNotename] = useState("New Widenote");
  const [tool, setTool] = useState("pen");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [penColor, setPenColor] = useState("#000000");
  const [tension, setTension] = useState(0.5);
  const [opacity, setOpacity] = useState(1);
  const [leftPadding, setLeftPadding] = useState(100);
  return (
    <>
      <CanvasStage tool={tool} />
      <div id="editor-canvas">
        <EditorCanvas
          tool={tool}
          strokeWidth={strokeWidth}
          penColor={penColor}
          stageRef={stageRef}
          tension={tension}
          opacity={opacity}
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
        />
      </div>
    </>
  );
}
