import { Button } from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import { doOCR } from "../../utils/papyrus/ocr";

const CanvasDraw: React.FC = () => {
  const [drawing, setDrawing] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasData, setCanvasData] = useState<string | null>(null);
  const [ocrtxt, setOcrtxt] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
    const context = canvas?.getContext("2d");

    if (context) {
      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 5;
    }
  }, []);

  const startDrawing = (e: TouchEvent | MouseEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      context.beginPath();
      context.moveTo(getX(e), getY(e));
      setDrawing(true);
    }
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const draw = (e: TouchEvent | MouseEvent) => {
    if (drawing) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

      if (context) {
        context.lineTo(getX(e), getY(e));
        context.stroke();
      }
    }
  };

  const getX = (e: TouchEvent | MouseEvent) => {
    if ("touches" in e) {
      return (
        e.touches[0].clientX - canvasRef.current!.getBoundingClientRect().left
      );
    } else {
      return e.clientX - canvasRef.current!.getBoundingClientRect().left;
    }
  };

  const getY = (e: TouchEvent | MouseEvent) => {
    if ("touches" in e) {
      return (
        e.touches[0].clientY - canvasRef.current!.getBoundingClientRect().top
      );
    } else {
      return e.clientY - canvasRef.current!.getBoundingClientRect().top;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const disableScroll = (e: TouchEvent) => {
      e.preventDefault();
    };

    if (canvas) {
      canvas.addEventListener("touchmove", disableScroll, { passive: false });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("touchmove", disableScroll);
      }
    };
  }, []);

  async function parseImg() {
    setOcrtxt("デコード中です");
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      setCanvasData(dataURL);
      setOcrtxt("認識中です");
      setOcrtxt(await doOCR(dataURL));
    }
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      />
      <Button onClick={() => parseImg()}>文字認識</Button>
      {ocrtxt}
    </>
  );
};

export default CanvasDraw;
