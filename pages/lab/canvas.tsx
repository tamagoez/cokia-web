import { useRef, useEffect, useState } from "react";
import { doOCR } from "../../utils/papyrus/ocr";

type Point = {
  x: number;
  y: number;
};

const Canvas = () => {
  const [ocrtxt, setOcrtxt] = useState("");

  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasData, setCanvasData] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [prevPoint, setPrevPoint] = useState<Point | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.lineCap = "round";
        context.strokeStyle = "#000000";
        context.lineWidth = 5;
        contextRef.current = context;
      }
    }
  }, []);

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    setPrevPoint({ x: offsetX, y: offsetY });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setPrevPoint(null);
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    if (prevPoint) {
      const context = contextRef.current;
      if (context) {
        context.beginPath();
        context.moveTo(prevPoint.x, prevPoint.y);
        context.lineTo(offsetX, offsetY);
        context.stroke();
      }
    }
    setPrevPoint({ x: offsetX, y: offsetY });
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      setCanvasData(dataURL);
    }
  };

  async function parseImg() {
    setOcrtxt(await doOCR(canvasData));
  }
  useEffect(() => {
    if (canvasData !== null) parseImg();
  }, [canvasData]);

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      />
      <button onClick={saveCanvas}>保存する</button>
      {canvasData && <img src={canvasData} alt="canvas data" />}
      OCR
      <br />
      {ocrtxt}
    </>
  );
};

export default Canvas;
