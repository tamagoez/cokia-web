import dynamic from "next/dynamic";

const EditorCanvas = dynamic(() => import("../canvas"), {
  ssr: false,
});

export default function EditorPage() {
  return (
    <>
      <style jsx global>{`#editor-controls {width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 801;}`}</style>
      <div id="editor-canvas">
        <EditorCanvas />
      </div>
      <div id="editor-controls">
        <EditorControls />
      </div>
    </>
  );
}

function EditorControls() {
  return (
    <>
      <p>a</p>
    </>
  );
}
