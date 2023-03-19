import { Button } from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import { doOCR } from "../../utils/papyrus/ocr";

const CanvasDraw: React.FC = () => {
  const [drawing, setDrawing] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasData, setCanvasData] = useState<string | null>(null);
  const [ocrtxt, setOcrtxt] = useState("");
  const [ocrnow, setOcrnow] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
    const context = canvas?.getContext("2d");
    // CSSを適用する
    const style = document.createElement("style");
    style.textContent = `canvas#${canvas.id} {-ms-touch-action: none; touch-action: none;}`;
    document.head.appendChild(style);

    if (context) {
      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 5;
    }
    // コンポーネントのアンマウント時にCSSを削除する
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const stopDrawing = () => {
    setDrawing(false);
  };

  const startDrawing = (e: TouchEvent<HTMLCanvasElement> | MouseEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      context.beginPath();
      context.moveTo(getX(e), getY(e));
      setDrawing(true);
    }
  };

  const draw = (e: TouchEvent<HTMLCanvasElement> | MouseEvent) => {
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
    setOcrnow(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      setCanvasData(dataURL);
      setOcrtxt(await doOCR(dataURL));
      setOcrnow(false);
    }
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        onTouchStart={startDrawing as TouchEventHandler<HTMLCanvasElement>}
        onTouchEnd={stopDrawing as TouchEventHandler<HTMLCanvasElement>}
        onTouchMove={draw as TouchEventHandler<HTMLCanvasElement>}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
      />

      <Button onClick={() => canvasData && parseImg()}>文字認識</Button>
      <p>{ocrnow ? "認識中" : "待機中"}</p>
      {ocrtxt}
    </>
  );
};

export default CanvasDraw;
