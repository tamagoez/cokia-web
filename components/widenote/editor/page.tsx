import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import EditorControls from "./controls";
import CanvasStage from "./stage";
import { AlertOnClose } from "../../ui/alert";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Divider,
} from "@chakra-ui/react";

const EditorCanvas = dynamic(() => import("./canvas/base"), {
  ssr: false,
});

interface LayerOption {
  id: number;
  name: string;
  type: string;
  zOrder: number;
  img: string;
  visible: boolean;
  opacity: number;
}

export default function EditorPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const stageRef = useRef(null);
  const [notename, setNotename] = useState("New Widenote");
  const [tool, setTool] = useState("pen");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [penColor, setPenColor] = useState("#000000");
  const [stageColor, setStageColor] = useState("#FFFFFF");
  const [tension, setTension] = useState(0.5);
  const [opacity, setOpacity] = useState(1);
  const [leftPadding, setLeftPadding] = useState(100);
  const [stageX, setStageX] = useState(1000);
  const [stageY, setStageY] = useState(1000);
  const [stageWidth, setStageWidth] = useState(0);
  const [stageHeight, setStageHeight] = useState(0);
  const [activeLayer, setActiveLayer] = useState(1);
  const [layers, setLayers] = useState<LayerOption[]>([
    {
      id: 1,
      name: "layer1",
      type: "pen",
      zOrder: 0,
      img: "",
      visible: true,
      opacity: 1,
    },
    {
      id: 2,
      name: "layer2",
      type: "pen",
      zOrder: 0,
      img: "",
      visible: true,
      opacity: 1,
    },
    {
      id: 3,
      name: "layer3",
      type: "pen",
      zOrder: 0,
      img: "",
      visible: true,
      opacity: 1,
    },
    {
      id: 4,
      name: "layer4",
      type: "pen",
      zOrder: 0,
      img: "",
      visible: true,
      opacity: 1,
    },
    {
      id: 5,
      name: "透明度テスト",
      type: "pen",
      zOrder: 0,
      img: "",
      visible: true,
      opacity: 0.7,
    },
    {
      id: 6,
      name: "非表示テスト",
      type: "pen",
      zOrder: 0,
      img: "",
      visible: false,
      opacity: 0.7,
    },
  ]);

  useEffect(() => {
    onOpen();
    setStageWidth(window.innerWidth + 2000);
    setStageHeight(window.innerHeight + 2000);
    setStageX(1000);
    setStageY(1000);
    window.scroll(1000, 1000);
  }, []);
  return (
    <>
      <AlertOnClose />
      <CanvasStage
        tool={tool}
        leftPadding={leftPadding}
        setLeftPadding={(newState) => setLeftPadding(newState)}
        stageX={stageX}
        setStageX={(newState) => setStageX(newState)}
        stageY={stageY}
        setStageY={(newState) => setStageY(newState)}
        stageColor={stageColor}
        stageWidth={stageWidth}
        stageHeight={stageHeight}
      />
      <div id="editor-canvas">
        <EditorCanvas
          tool={tool}
          strokeWidth={strokeWidth}
          penColor={penColor}
          stageRef={stageRef}
          tension={tension}
          opacity={opacity}
          stageX={stageX}
          stageY={stageY}
          stageColor={stageColor}
          layers={layers}
          setLayers={(newState) => setLayers(newState)}
          activeLayer={activeLayer}
        />
      </div>
      <div id="editor-controls">
        <EditorControls
          stageRef={stageRef}
          notename={notename}
          setNotename={(newState) => setNotename(newState)}
          tool={tool}
          setTool={(newState) => setTool(newState)}
          strokeWidth={strokeWidth}
          setStrokeWidth={(newstate) => setStrokeWidth(newstate)}
          penColor={penColor}
          setPenColor={(newstate) => setPenColor(newstate)}
          tension={tension}
          setTension={(newstate) => setTension(newstate)}
          opacity={opacity}
          setOpacity={(newState) => setOpacity(newState)}
          stageColor={stageColor}
          setStageColor={(newState) => setStageColor(newState)}
          stageWidth={stageWidth}
          setStageWidth={(newState) => setStageWidth(newState)}
          stageHeight={stageHeight}
          setStageHeight={(newState) => setStageHeight(newState)}
          layers={layers}
          setLayers={(newState) => setLayers(newState)}
          activeLayer={activeLayer}
          setActiveLayer={(newState) => setActiveLayer(newState)}
          stageX={stageX}
          stageY={stageY}
          setStageX={(newState) => setStageX(newState)}
          setStageY={(newState) => setStageY(newState)}
        />
      </div>
      <div>
        <Modal onClose={onClose} isOpen={isOpen} isCentered size="lg">
          <ModalOverlay />
          <ModalContent backgroundColor="pink.50">
            <ModalHeader>注意/変更ログ</ModalHeader>
            <ModalBody>
              現在開発中のため、<b>不具合が発生する可能性があります</b>。
              <Divider my={4} />
              <b>作成中</b>
              <br />
              <UnorderedList ml={8} mb={4}>
                <ListItem>セーブデータの読み込み</ListItem>
                <ListItem>ペンのプリセット設定</ListItem>
                <ListItem>ペンのテクスチュア</ListItem>
                <ListItem>レイヤー追加削除/表示非表示</ListItem>
                <ListItem>テキストレイヤー</ListItem>
              </UnorderedList>
              <b>実装済み</b>
              <br />
              <UnorderedList ml={8}>
                <ListItem>セーブ</ListItem>
                <ListItem>ペンの設定[太さ/色/透明度]</ListItem>
                <ListItem>レイヤーの選択</ListItem>
                <ListItem>ステージのスクロール(移動)</ListItem>
                <ListItem>操作モード変更</ListItem>
              </UnorderedList>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} colorScheme="red">
                了解
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
