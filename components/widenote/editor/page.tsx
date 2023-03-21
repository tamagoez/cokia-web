import { useState } from "react";
import dynamic from "next/dynamic";
import EditorControls from "./controls";

const EditorCanvas = dynamic(() => import("./canvas"), {
  ssr: false,
});

export default function EditorPage() {
  const [tool, setTool] = useState("pen");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [penColor, setPenColor] = useState("#000000");
  return (
    <>
      <div id="editor-canvas">
        <EditorCanvas
          tool={tool}
          strokeWidth={strokeWidth}
          penColor={penColor}
        />
      </div>
      <div id="editor-controls">
        <EditorControls
          tool={tool}
          setTool={(newState) => setTool(newState)}
          strokeWidth={strokeWidth}
          setStrokeWidth={(newstate) => setStrokeWidth(newstate)}
          penColor={penColor}
          setPenColor={(newstate) => setPenColor(newstate)}
        />
      </div>
    </>
  );
}
