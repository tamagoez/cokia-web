import { FC, useRef, useState, useEffect } from "react";
import Konva from "konva";
import { Stage, Layer, Text, Line, Rect } from "react-konva";
import PenLayer from "./penlayer";

interface LayerOption {
  id: number;
  name: string;
  type: string;
  zOrder: number;
}

export default function EditorCanvas({
  tool,
  strokeWidth,
  opacity,
  tension,
  penColor,
  stageRef,
  stageX,
  stageY,
  stageColor,
  activeLayer,
}: {
  tool: string;
  strokeWidth: number;
  opacity: number;
  tension: number;
  penColor: string;
  stageRef: any;
  stageX: number;
  stageY: number;
  stageColor: string;
  activeLayer: number;
}) {
  const [layers, setLayers] = useState<LayerOption[]>([
    { id: 1, name: "a", type: "pen", zOrder: 0 },
  ]);

  const [lines, setLines] = useState([{ id: 1, data: [] }]);
  const isDrawing = useRef(false);

  const [lastCenter, setLastCenter] = useState(null);
  const [lastDist, setLastDist] = useState(0);
  // Konva.hitOnDragEnabled = true;

  const handleMouseDown = (e) => {
    e.evt.preventDefault();
    if (tool === "cursor") return;
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    const posX = Number(pos.x) + Number(stageX);
    const posY = Number(pos.y) + Number(stageY);

    const objIndex = lines.findIndex((obj) => obj.id == activeLayer);
    if (objIndex !== -1) {
      const newArr = [...lines]; // 配列をコピー
      newArr[objIndex].data.push({
        tool,
        points: [posX, posY],
        strokeWidth,
        penColor,
        opacity,
      }); // 新しいオブジェクトを追加
      setLines(newArr); // ステートを更新
    }
    // console.log(lines);
    updatePreview(stageRef);
  };

  const handleMouseMove = (e) => {
    e.evt.preventDefault();
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const posX = Number(point.x) + Number(stageX);
    const posY = Number(point.y) + Number(stageY);
    const objIndex = lines.findIndex((obj) => obj.id == activeLayer);
    if (objIndex !== -1) {
      const newArr = [...lines];
      const thisLine = newArr[objIndex].data;
      const lastLine = thisLine[thisLine.length - 1]; // ここを修正
      const newPoints = lastLine.points.concat([posX, posY]);
      const replaceArray = newArr.map((item) => {
        if (item.id === activeLayer) {
          const newData = [...item.data];
          newData.splice(newData.length - 1, 1, {
            ...lastLine,
            points: newPoints,
          });
          return { ...item, data: newData };
        } else {
          return item;
        }
      });
      setLines(replaceArray);
    }
    updatePreview(stageRef);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    setLastDist(0);
    setLastCenter(null);
  };

  return (
    <>
      <style jsx global>{`
        .stage {
          /* iOS等でのスクロール防止(cursor以外) */
          -ms-touch-action: none;
          touch-action: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-user-drag: none;
          /* fixedのためz-indexはいらない */
          z-index: 10;
          /* 画面全体を覆う */
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
        }
        #preview {
          background-color: #e0dfe1;
          position: fixed;
          top: 75px;
          right: 15px;
          opacity: 0.6;
        }
      `}</style>
      <p style={{ position: "fixed", top: 70, left: 30 }}>
        選択中レイヤーID: {activeLayer}
      </p>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        className="stage"
        ref={stageRef}
        style={{ position: tool === "cursor" ? "fixed" : "fixed" }}
        x={0 - stageX}
        y={0 - stageY}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        {layers.map((layer, index) => {
          if (layer.type === "pen") {
            return <PenLayer key={index} id={layer.id} allLines={lines} />;
          }
        })}
      </Stage>
    </>
  );
}

function updatePreview(stageRef: any) {
  return;
  const stage = stageRef.current;
  const scale = 1 / 12;
  // use pixelRatio to generate smaller preview
  const url = stage.toDataURL({ pixelRatio: scale });
  (document.getElementById("preview") as HTMLImageElement).src = url;
}
