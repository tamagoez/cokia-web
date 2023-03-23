import {
  Flex,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  IconButton,
  Box,
  Center,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
} from "@chakra-ui/react";
import { FaPen, FaEraser, FaArrowsAlt } from "react-icons/fa";
import { MdIosShare } from "react-icons/md";

export default function EditorControls({
  stageRef,
  notename,
  setNotename,
  tool,
  setTool,
  strokeWidth,
  setStrokeWidth,
  penColor,
  setPenColor,
  tension,
  setTension,
  opacity,
  setOpacity,
}: {
  stageRef: any;
  notename: string;
  setNotename: any;
  tool: string;
  setTool: any;
  strokeWidth: number;
  setStrokeWidth: any;
  penColor: string;
  setPenColor: any;
  tension: number;
  setTension: any;
  opacity: number;
  setOpacity: any;
}) {
  return (
    <>
      <style jsx global>{`
        #cursor-mode-control {
          position: fixed;
          bottom: 10px;
          left: 15px;
        }
        #pen-option-control {
          position: fixed;
          bottom: 10px;
          right: 15px;
        }
        #note-option-control {
          position: fixed;
          top: 10px;
          right: 15px;
        }
        #note-setting-control {
          position: fixed;
          top: 10px;
          left: 15px;
        }
      `}</style>
      <CursorModeControl tool={tool} setTool={setTool} />
      <PenOptionControl
        strokeWidth={strokeWidth}
        setStrokeWidth={(newstate) => setStrokeWidth(newstate)}
        penColor={penColor}
        setPenColor={(newstate) => setPenColor(newstate)}
      />
      <NoteOptionControl stageRef={stageRef} notename={notename} />
      <NoteSettingControl
        notename={notename}
        setNotename={(newstate) => setNotename(newstate)}
      />
    </>
  );
}

function CursorModeControl({ tool, setTool }: { tool: string; setTool: any }) {
  return (
    <div id="cursor-mode-control">
      <Box bg="gray.100" w="140px" p={2} color="gray.600" borderRadius="xl">
        <Center>
          <IconButton
            variant="ghost"
            isActive={tool === "pen"}
            onClick={() => setTool("pen")}
            aria-label="Pen"
            icon={<FaPen />}
          />
          <IconButton
            variant="ghost"
            isActive={tool === "eraser"}
            onClick={() => setTool("eraser")}
            aria-label="Eraser"
            icon={<FaEraser />}
          />
          <IconButton
            variant="ghost"
            isActive={tool === "cursor"}
            onClick={() => setTool("cursor")}
            aria-label="Cursor"
            icon={<FaArrowsAlt />}
          />
        </Center>
      </Box>
    </div>
  );
}

function PenOptionControl({
  strokeWidth,
  setStrokeWidth,
  penColor,
  setPenColor,
  opacity,
  setOpacity,
}: {
  strokeWidth: number;
  setStrokeWidth: any;
  penColor: string;
  setPenColor: any;
  opacity: number;
  setOpacity: any;
}) {
  return (
    <div id="pen-option-control">
      <Box
        bg="gray.100"
        w="50vw"
        maxW="1200px"
        p={4}
        color="gray.600"
        borderRadius="xl"
      >
        <Flex>
          <Center w="40px">
            <input
              type="color"
              id="head"
              name="head"
              value={penColor}
              onChange={(e) => {
                setPenColor(e.target.value);
              }}
            />
          </Center>
          <Box flex="1">
            <Slider
              aria-label="slider-ex-1"
              value={strokeWidth}
              onChange={(val) => setStrokeWidth(val)}
              min={0}
              max={50}
              step={0.1}
              w="100%"
            >
              <SliderMark
                value={strokeWidth}
                textAlign="center"
                bg="blue.500"
                color="white"
                mb="-10"
                ml="-6"
                w="14"
              >
                {strokeWidth} pt
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Slider
              aria-label="slider-ex-1"
              value={opacity * 100}
              onChange={(val) => setOpacity(val / 100)}
              min={0}
              max={100}
              step={1}
              w="100%"
            >
              <SliderMark
                value={strokeWidth}
                textAlign="center"
                bg="blue.500"
                color="white"
                mb="-10"
                ml="-6"
                w="14"
              >
                {opacity * 100} %
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Flex>
      </Box>
    </div>
  );
}

function NoteOptionControl({
  stageRef,
  notename,
}: {
  stageRef: any;
  notename: string;
}) {
  function downloadImg() {
    const name = notename;
    const uri = stageRef.current.toDataURL({
      pixelRatio: window.devicePixelRatio,
    });
    downloadUri(name, uri);
  }
  function downloadJSON() {
    const json = JSON.stringify(stageRef.current.toJSON());
    const blob = new Blob([json], { type: "application/json" });
    const uri = window.URL.createObjectURL(blob);
    downloadUri(notename, uri);
  }
  function downloadUri(name, uri) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
  }
  return (
    <div id="note-option-control">
      <Box bg="gray.100" w="100px" p={2} color="gray.600" borderRadius="xl">
        <Center>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Share"
              icon={<MdIosShare />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem onClick={() => downloadImg()}>Download PNG</MenuItem>
              <MenuItem onClick={() => downloadJSON()}>Download JSON</MenuItem>
            </MenuList>
          </Menu>
        </Center>
      </Box>
    </div>
  );
}

function NoteSettingControl({
  notename,
  setNotename,
}: {
  notename: string;
  setNotename: any;
}) {
  return (
    <div id="note-setting-control">
      <Box bg="gray.100" w="200px" p={2} color="gray.600" borderRadius="xl">
        <Input
          placeholder="Note Name"
          value={notename}
          onChange={(e) => setNotename(e.target.value)}
        />
      </Box>
    </div>
  );
}
