import React, { useRef } from "react";
import CanvasDraw from "react-canvas-draw";

const DrawingApp = () => {
  const canvasRef = useRef<CanvasDraw>(null);

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  return (
    <div>
      <CanvasDraw
        ref={canvasRef}
        brushColor="black"
        brushRadius={5}
        lazyRadius={0}
        hideGrid={true}
        canvasWidth="300px"
        canvasHeight="300px"
      />
      <button onClick={clearCanvas}>Clear</button>
    </div>
  );
};

export default DrawingApp;
