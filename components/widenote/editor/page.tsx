import { useState } from "react";
import dynamic from "next/dynamic"

const EditorCanvas = dynamic(() => import("./canvas"), {
  ssr: false,
});

export default function EditorPage() {
  const [tool, setTool] = useState("pen");
  return (
    <>
      <style jsx global>{`#editor-controls {width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 801;
    top: 0;
    left: 0;}`}</style>
      <div id="editor-canvas">
        <EditorCanvas tool={tool} />
      </div>
      <div id="editor-controls">
        <EditorControls tool={tool} setTool={(newState) => setTool(newState)} />
      </div>
    </>
  );
}