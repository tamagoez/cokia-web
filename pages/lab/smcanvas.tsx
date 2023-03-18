import { useRef, useEffect, useState } from "react";
import { doOCR } from "../../utils/papyrus/ocr";

type Point = {
  x: number;
  y: number;
};

const SMCanvas = () => {
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
  }:
    | React.MouseEvent<HTMLCanvasElement>
    | React.TouchEvent<HTMLCanvasElement>) => {
    const point = getPointFromEvent(nativeEvent);
    setIsDrawing(true);
    setPrevPoint(point);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setPrevPoint(null);
  };

  const draw = ({
    nativeEvent,
  }:
    | React.MouseEvent<HTMLCanvasElement>
    | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const point = getPointFromEvent(nativeEvent);
    if (prevPoint) {
      const context = contextRef.current;
      if (context) {
        context.beginPath();
        context.moveTo(prevPoint.x, prevPoint.y);
        context.lineTo(point.x, point.y);
        context.stroke();
      }
    }
    setPrevPoint(point);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      setCanvasData(dataURL);
    }
  };

  const getPointFromEvent = (event: MouseEvent | TouchEvent): Point => {
    const canvas = canvasRef.current;
    if (canvas) {
      const { left, top } = canvas.getBoundingClientRect();
      if (event instanceof MouseEvent) {
        return {
          x: event.clientX - left,
          y: event.clientY - top,
        };
      } else if (event instanceof TouchEvent) {
        const { clientX, clientY } = event.touches[0];
        return {
          x: clientX - left,
          y: clientY - top,
        };
      }
    }
    return { x: 0, y: 0 };
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
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
      />
      <button onClick={saveCanvas}>保存する</button>
      {canvasData && <img src={canvasData} alt="canvas data" />}
      OCR
      <br />
      {ocrtxt}
    </>
  );
};

export default SMCanvas;
