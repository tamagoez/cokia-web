import { useState } from "react";
import dynamic from "next/dynamic";

const EditorCanvas = dynamic(() => import("canvas"), {
  ssr: false,
});

const EditorPage: FC = () => {
  const [tool, setTool] = useState("pen");
  return (
    <>
      <style jsx global>{`#editor-controls {width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 801;}`}</style>
      <div id="editor-canvas">
        <EditorCanvas tool={tool} />
      </div>
      <div id="editor-controls">
        <EditorControls tool={tool} setTool={(newState) => setTool(newState)} />
      </div>
    </>
  );
};
export default EditorPage;

function EditorControls({ tool, setTool }: { tool: string; setTool: any }) {
  return (
    <>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
    </>
  );
}
